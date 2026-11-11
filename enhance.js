/*
 * enhance.js — production layer for the contact forms.
 *
 * Injected into every page on each deploy (scripts/inject_enhance.py). It does
 * not touch the DOM; it only provides window.TWK, which the Claude Design
 * components (sections/FinalCTA.jsx, sections/sparring/SpCTA.jsx) use to
 * really deliver an inquiry:
 *
 *   TWK.submitInquiry(fields, { subject, fromName })  -> Promise
 *       resolves only when Web3Forms confirms delivery, rejects otherwise
 *       (HTTP/network error, timeout, success:false) — so the UI can show an
 *       honest success or error state.
 *   TWK.mailtoHref(fields, subject)                    -> "mailto:…" fallback
 *       with the visitor's text prefilled, so nothing is lost on an error.
 *
 * In the Claude Design editor this file is absent (window.TWK undefined), and
 * the components fall back to their original preview behaviour — so previewing
 * or editing in Design never sends a real inquiry.
 */
(function () {
  'use strict';

  var CONTACT_EMAIL = 'info@thewhykings.com';
  // web3forms.com access key (public form-id) — delivers to the Web3Forms inbox.
  var WEB3FORMS_KEY = '86e85b45-d5c0-425c-ad02-0277510fd4b6';
  var ENDPOINT = 'https://api.web3forms.com/submit';
  var TIMEOUT_MS = 15000;

  // drop empty fields, stringify the rest
  function clean(fields) {
    var out = {};
    Object.keys(fields || {}).forEach(function (k) {
      var v = fields[k];
      if (v === undefined || v === null) return;
      v = String(v).trim();
      if (v !== '') out[k] = v;
    });
    return out;
  }

  function submitInquiry(fields, opts) {
    opts = opts || {};
    var data = clean(fields);
    var payload = {
      access_key: WEB3FORMS_KEY,
      subject: opts.subject || 'Neue Anfrage über thewhykings.com',
      from_name: opts.fromName || data.name || 'Website-Kontakt'
    };
    Object.keys(data).forEach(function (k) { payload[k] = data[k]; });

    var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, TIMEOUT_MS) : null;
    function done() { if (timer) clearTimeout(timer); }

    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: ctl ? ctl.signal : undefined
    })
      .then(function (r) { return r.json().catch(function () { return null; }); })
      .then(function (d) {
        done();
        if (d && d.success) return d;
        throw new Error((d && d.message) || 'Versand fehlgeschlagen');
      }, function (e) { done(); throw e; });
  }

  function mailtoHref(fields, subject) {
    var data = clean(fields);
    var lines = Object.keys(data).map(function (k) { return k + ': ' + data[k]; });
    return 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject || 'Anfrage über thewhykings.com') +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  window.TWK = window.TWK || {};
  window.TWK.contactEmail = CONTACT_EMAIL;
  window.TWK.submitInquiry = submitInquiry;
  window.TWK.mailtoHref = mailtoHref;
})();
