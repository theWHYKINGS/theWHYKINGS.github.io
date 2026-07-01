/*
 * enhance.js — progressive enhancements layered on top of the Claude Design
 * export (which is regenerated on every deploy, so we enhance at runtime):
 *   1. Footer "Impressum · Datenschutz" text -> real links to the legal pages.
 *   2. Contact form -> actually submits (Web3Forms inbox delivery, or a
 *      mailto: fallback when no key is configured).
 *
 * The deploy pipeline re-injects <script src="enhance.js"> into index.html
 * after each pull, so this keeps working across design updates.
 */
(function () {
  'use strict';

  // ==== Config ====
  var CONTACT_EMAIL = 'dominik@thewhykings.com';
  // web3forms.com access key (public form-id) — delivers submissions to the
  // Web3Forms account inbox (dominik@thewhykings.com). Empty => mailto fallback.
  var WEB3FORMS_KEY = '86e85b45-d5c0-425c-ad02-0277510fd4b6';

  var done = { form: false };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---- Contact form ----
  // (Footer Impressum/Datenschutz links are now native in the Design export,
  //  pointing at legal/Impressum.html + legal/Datenschutz.html — no patching needed.)
  function readFields(form) {
    var v = { name: '', email: '', message: '' };
    form.querySelectorAll('input, textarea').forEach(function (f) {
      if (f.tagName === 'TEXTAREA') v.message = f.value;
      else if (f.type === 'email') v.email = f.value;
      else if (!v.name) v.name = f.value;
    });
    return v;
  }

  function mailtoFallback(v) {
    var subject = 'Strategiegespräch-Anfrage über thewhykings.com';
    var body = 'Name: ' + v.name + '\nE-Mail: ' + v.email + '\n\n' + v.message;
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }

  function showThanks(form, v) {
    var box = document.createElement('div');
    box.setAttribute('role', 'status');
    box.style.cssText = 'padding:24px 26px;border-radius:14px;background:rgba(183,159,99,.12);' +
      'border:1px solid rgba(183,159,99,.45);color:inherit;font-size:16px;line-height:1.55';
    box.innerHTML = '<strong>Danke' + (v.name ? ', ' + escapeHtml(v.name.split(' ')[0]) : '') +
      '!</strong><br>Deine Anfrage ist eingegangen — ich melde mich zeitnah persönlich bei dir.';
    if (form.parentNode) form.parentNode.replaceChild(box, form);
  }

  function enhanceForm() {
    if (done.form) return;
    var form = document.querySelector('form');
    if (!form) return;

    // give fields names (helps the backend + accessibility)
    form.querySelectorAll('input, textarea').forEach(function (f) {
      if (f.name) return;
      if (f.tagName === 'TEXTAREA') f.name = 'message';
      else if (f.type === 'email') f.name = 'email';
      else f.name = 'name';
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = readFields(form);
      if (!v.email || v.email.indexOf('@') < 1) {
        alert('Bitte gib eine gültige E-Mail-Adresse an.');
        return;
      }
      var btn = form.querySelector('button, [type=submit]');
      var restore = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Wird gesendet…'; }

      if (WEB3FORMS_KEY) {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: 'Neue Strategiegespräch-Anfrage — thewhykings.com',
            from_name: v.name || 'Website-Kontakt',
            name: v.name, email: v.email, message: v.message
          })
        }).then(function (r) { return r.json(); })
          .then(function (d) {
            if (d && d.success) showThanks(form, v);
            else { if (btn) { btn.disabled = false; btn.textContent = restore; } mailtoFallback(v); }
          })
          .catch(function () { if (btn) { btn.disabled = false; btn.textContent = restore; } mailtoFallback(v); });
      } else {
        mailtoFallback(v);
        if (btn) { btn.disabled = false; btn.textContent = restore; }
      }
    });
    done.form = true;
  }

  function run() { enhanceForm(); }

  // The homepage renders client-side (React via Babel), so poll until the
  // form exists, then wire it. Stop once wired (or we give up).
  var tries = 0;
  var iv = setInterval(function () {
    run();
    if (done.form || ++tries > 50) clearInterval(iv);
  }, 250);
  window.addEventListener('load', run);
})();
