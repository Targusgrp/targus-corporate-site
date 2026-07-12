const DIVISION_LABELS = {
  general: "General enquiry",
  construction: "Construction",
  procurement: "Procurement",
  sales: "Sales",
  agriculture: "Agriculture",
  properties: "Properties",
};

const REQUIRED_FIELDS = ["name", "email", "division", "message"];

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function cleanLong(value) {
  return String(value || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildEmailBody(data) {
  const lines = [
    `Name: ${data.name}`,
    `Company: ${data.company || "Not provided"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Division: ${DIVISION_LABELS[data.division] || data.division}`,
    `Location: ${data.location || "Not provided"}`,
    `Timeline: ${data.timeline || "Not provided"}`,
    "",
    "Message:",
    data.message,
  ];

  return lines.join("\n");
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { ok: false, message: "Method not allowed." });
  }

  const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};

  if (clean(body.website)) {
    return sendJson(response, 200, { ok: true });
  }

  const data = {
    name: clean(body.name),
    company: clean(body.company),
    email: clean(body.email),
    phone: clean(body.phone),
    division: clean(body.division || "general").toLowerCase(),
    location: clean(body.location),
    timeline: clean(body.timeline),
    message: cleanLong(body.message),
  };

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);

  if (missing.length || !isValidEmail(data.email)) {
    return sendJson(response, 400, {
      ok: false,
      message: "Please complete the required fields with a valid email address.",
    });
  }

  if (!DIVISION_LABELS[data.division]) {
    data.division = "general";
  }

  if (!process.env.RESEND_API_KEY) {
    return sendJson(response, 503, {
      ok: false,
      code: "EMAIL_NOT_CONFIGURED",
      message: "Online enquiry delivery is not configured yet.",
    });
  }

  const to = process.env.ENQUIRY_TO || "info@targusgrp.com";
  const from = process.env.ENQUIRY_FROM || "Targus Website <onboarding@resend.dev>";
  const subject = `Website enquiry - ${DIVISION_LABELS[data.division]}`;
  const text = buildEmailBody(data);

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    return sendJson(response, 502, {
      ok: false,
      message: "The enquiry could not be sent. Please email info@targusgrp.com directly.",
    });
  }

  return sendJson(response, 200, {
    ok: true,
    message: "Thank you. Your enquiry has been sent to Targus Nig Ltd.",
  });
};
