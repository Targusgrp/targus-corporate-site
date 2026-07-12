const form = document.querySelector("[data-enquiry-form]");
const statusEl = document.querySelector("[data-form-status]");
const fallbackLink = document.querySelector("[data-mail-fallback]");

const subjects = {
  general: "General Partnership Enquiry",
  construction: "Construction Project Enquiry",
  procurement: "Procurement Request",
  sales: "Sales Enquiry",
  agriculture: "Agriculture Partnership",
  properties: "Property Enquiry",
};

function setStatus(message, type) {
  statusEl.textContent = message || "";
  statusEl.className = `form-status ${type || ""}`.trim();
}

function buildMailto(data) {
  const subject = subjects[data.division] || subjects.general;
  const body = [
    `Name: ${data.name || ""}`,
    `Company: ${data.company || ""}`,
    `Email: ${data.email || ""}`,
    `Phone: ${data.phone || ""}`,
    `Business area: ${data.division || "general"}`,
    `Location: ${data.location || ""}`,
    `Timeline: ${data.timeline || ""}`,
    "",
    "Message:",
    data.message || "",
  ].join("\n");

  return `mailto:info@targusgrp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function getPayload() {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

function applyDivisionFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const division = params.get("division");
  const select = form.elements.division;

  if (division && [...select.options].some((option) => option.value === division)) {
    select.value = division;
  }
}

form.addEventListener("input", () => {
  fallbackLink.href = buildMailto(getPayload());
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = getPayload();
  const submitButton = form.querySelector("button[type='submit']");
  fallbackLink.href = buildMailto(payload);
  submitButton.disabled = true;
  setStatus("Submitting enquiry...", "");

  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      throw new Error(result.message || "The enquiry could not be submitted online.");
    }

    form.reset();
    fallbackLink.href = "mailto:info@targusgrp.com";
    setStatus(result.message || "Thank you. Your enquiry has been sent.", "success");
  } catch (error) {
    setStatus(`${error.message} You can use the email option beside the submit button.`, "error");
  } finally {
    submitButton.disabled = false;
  }
});

applyDivisionFromQuery();
fallbackLink.href = buildMailto(getPayload());
