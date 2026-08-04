/*
 * enhance.js — progressive enhancement layered on the Claude Design export
 * (regenerated every deploy, so we enhance at runtime). It wires the contact
 * form(s) on the homepage and the Sparring sub-page to actually submit
 * (Web3Forms inbox delivery, mailto: fallback). It collects EVERY form field
 * generically, so richer forms (mandate type, location, …) come through too.
 *
 * Re-injected into each app page on every deploy by scripts/inject_enhance.py.
 */
(function () {
  'use strict';

  // ==== Config ====
  var CONTACT_EMAIL = 'dominik@thewhykings.com';
  // web3forms.com access key (public form-id) — delivers to the Web3Forms inbox.
  var WEB3FORMS_KEY = '86e85b45-d5c0-425c-ad02-0277510fd4b6';

  var done = { form: false };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function slugify(s) {
    return String(s || '').toLowerCase()
      .replace(/[äöü]/g, function (c) { return { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue' }[c]; })
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40);
  }

  // Give every unnamed field a usable name (email/textarea specialised, others
  // slugged from placeholder/aria-label). Fields the design already named
  // (e.g. radio groups "mandat"/"ort") are left untouched.
  function nameFields(form) {
    form.querySelectorAll('input, textarea, select').forEach(function (f, i) {
      if (f.name) return;
      if (f.type === 'email') { f.name = 'email'; return; }
      if (f.tagName === 'TEXTAREA') { f.name = 'nachricht'; return; }
      var slug = slugify(f.placeholder || f.getAttribute('aria-label') || '');
      f.name = slug || ('feld_' + (i + 1));
    });
  }

  // Collect all named fields into a flat object (radios/checkboxes: checked only).
  function collect(form) {
    var data = {};
    form.querySelectorAll('input, textarea, select').forEach(function (f) {
      if (!f.name) return;
      if ((f.type === 'radio' || f.type === 'checkbox') && !f.checked) return;
      if (f.value !== '') data[f.name] = f.value;
    });
    return data;
  }

  function guessName(data) {
    for (var k in data) if (/name/.test(k) && !/firm|company|unternehmen/.test(k)) return data[k];
    return '';
  }

  function mailtoFallback(data) {
    var lines = [];
    for (var k in data) lines.push(k + ': ' + data[k]);
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent('Anfrage über thewhykings.com') +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function showThanks(form, firstName) {
    var box = document.createElement('div');
    box.setAttribute('role', 'status');
    box.style.cssText = 'padding:24px 26px;border-radius:14px;background:rgba(183,159,99,.12);' +
      'border:1px solid rgba(183,159,99,.45);color:inherit;font-size:16px;line-height:1.55';
    box.innerHTML = '<strong>Danke' + (firstName ? ', ' + escapeHtml(firstName.split(' ')[0]) : '') +
      '!</strong><br>Deine Anfrage ist eingegangen — ich melde mich zeitnah persönlich bei dir.';
    if (form.parentNode) form.parentNode.replaceChild(box, form);
  }

  function enhanceForm() {
    if (done.form) return;
    var form = document.querySelector('form');
    if (!form) return;
    nameFields(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = collect(form);
      if (!data.email || data.email.indexOf('@') < 1) {
        alert('Bitte gib eine gültige E-Mail-Adresse an.');
        return;
      }
      var name = guessName(data);
      var btn = form.querySelector('button, [type=submit]');
      var restore = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Wird gesendet…'; }

      function fail() { if (btn) { btn.disabled = false; btn.textContent = restore; } mailtoFallback(data); }

      if (WEB3FORMS_KEY) {
        var payload = { access_key: WEB3FORMS_KEY, subject: 'Neue Anfrage über thewhykings.com', from_name: name || 'Website-Kontakt' };
        for (var k in data) payload[k] = data[k];
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (r) { return r.json(); })
          .then(function (d) { if (d && d.success) showThanks(form, name); else fail(); })
          .catch(fail);
      } else {
        mailtoFallback(data);
        if (btn) { btn.disabled = false; btn.textContent = restore; }
      }
    });
    done.form = true;
  }

  // Pages render client-side (React via Babel), so poll until the form exists.
  var tries = 0;
  var iv = setInterval(function () {
    enhanceForm();
    if (done.form || ++tries > 50) clearInterval(iv);
  }, 250);
  window.addEventListener('load', enhanceForm);
})();
