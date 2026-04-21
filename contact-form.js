/* ==========================================================
   contact-form.js
   Maneja el envio del formulario de contacto via Formspree.
   ========================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form")
            || document.querySelector("#contacto form");
    if (!form) return;

    var status = form.querySelector("#form-status");
    if (!status) {
      status = document.createElement("div");
      status.id = "form-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      form.appendChild(status);
    }

    status.style.marginTop = "14px";
    status.style.fontSize = "0.95em";
    status.style.minHeight = "1.2em";
    status.style.transition = "color .2s ease";
    status.style.fontFamily = "'Fira Code', monospace";

    var btn = form.querySelector(".btn-enviar") || form.querySelector("button[type=submit]");
    var originalBtnText = btn ? btn.textContent.trim() : "Send Message";

    function setStatus(msg, kind) {
      status.textContent = msg;
      if (kind === "ok")       status.style.color = "#00cc66";
      else if (kind === "err") status.style.color = "#ff3366";
      else                     status.style.color = "#cccccc";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.action || form.action.indexOf("formspree.io") === -1
          || form.action.indexOf("TU_ID_AQUI") !== -1) {
        setStatus("Formspree no esta configurado. Revisa action='...' del formulario.", "err");
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending...";
      }
      setStatus("Sending your message...", "info");

      var data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus("Message sent. I will get back to you soon.", "ok");
          return;
        }
        return res.json().then(function (payload) {
          var msg = "Something went wrong. Please try again.";
          if (payload && Array.isArray(payload.errors) && payload.errors.length) {
            msg = payload.errors.map(function (x) { return x.message; }).join(", ");
          }
          setStatus(msg, "err");
        }).catch(function () {
          setStatus("Something went wrong. Please try again.", "err");
        });
      })
      .catch(function () {
        setStatus("Network error. Check your connection and try again.", "err");
      })
      .then(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalBtnText;
        }
      });
    });
  });
})();
