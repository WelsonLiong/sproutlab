import {icon} from './app.js?v=8';
import {canSave} from './grove-progress.js';
import {completedCampaign,updateCompletionName} from './grove-completion.js';
import {drawCertificate,downloadCertificate,printCertificate} from './grove-certificate.js';

export function mountCertificate(host) {
  let dead = false, renderId = 0;
  const life = new AbortController();
  host.innerHTML = `<div class="certificate-sheet"><h2 tabindex="-1">Your discovery certificate</h2><p>You completed Nico and the Dying Forest. This certificate celebrates your journey.</p><div class="certificate-toolbar"><form id="certificate-name-form"><label for="certificate-name">Name on the certificate</label><div><input id="certificate-name" maxlength="40" autocomplete="off"><button type="submit">Update name</button></div></form></div><p id="certificate-status" role="status" aria-live="polite"></p><div class="certificate-actions"><button id="certificate-download">${icon('download')} Download PDF</button><button id="certificate-print">${icon('book')} Print</button></div><div id="certificate-preview" class="certificate-preview" role="img" aria-label="Certificate preview"></div><p class="certificate-local-note">Your name and completion are saved on this computer. Download the PDF to keep a copy.</p></div>`;
  const $ = selector => host.querySelector(selector);
  const listen = (selector, type, fn) => $(selector).addEventListener(type, fn, {signal: life.signal});
  async function paint() {
    const token = ++renderId, completion = completedCampaign();
    $('#certificate-download').disabled = true;$('#certificate-print').disabled = true;
    $('#certificate-status').textContent = 'Preparing your certificate…';
    $('#certificate-name').value = completion.name;
    try {
      const canvas = await drawCertificate(completion);
      if (dead || token !== renderId) return;
      const date = completion.completedAt ? `, completed ${new Date(completion.completedAt).toLocaleDateString('en-MY')}` : '';
      canvas.setAttribute('aria-label', `Completion certificate for ${completion.name}${date}`);
      $('#certificate-preview').replaceChildren(canvas);
      $('#certificate-preview').setAttribute('aria-label', canvas.getAttribute('aria-label'));
      $('#certificate-download').disabled = false;$('#certificate-print').disabled = false;
      $('#certificate-status').textContent = canSave() ? 'Your PDF is ready.' : 'Progress cannot be saved here. Download your certificate before leaving.';
    } catch {
      $('#certificate-status').textContent = 'The certificate could not be drawn. Update the name to try again.';
    }
  }
  listen('#certificate-name-form', 'submit', event => {event.preventDefault();updateCompletionName($('#certificate-name').value);paint()});
  listen('#certificate-download', 'click', async () => {try {await downloadCertificate();if (!dead) $('#certificate-status').textContent = 'PDF downloaded.'} catch {if (!dead) $('#certificate-status').textContent = 'Download did not finish. Try again or choose Print.'}});
  listen('#certificate-print', 'click', async () => {try {await printCertificate()} catch {if (!dead) $('#certificate-status').textContent = 'Printing could not start. Download the PDF instead.'}});
  paint();
  return () => {dead = true;life.abort()};
}

export function certificatePage() {
  return `<section class="certificate-page"><a href="#map">${icon('map')} Back to adventures</a><div id="saved-certificate"></div></section>`;
}

let cleanupPage;
export function cleanupCertificate() {cleanupPage?.();cleanupPage = null}
export function bindCertificatePage() {
  cleanupCertificate();
  const host = document.querySelector('#saved-certificate');
  if (!completedCampaign()) {
    host.innerHTML = `<h1>Your certificate is waiting</h1><p>Complete Nico and the Dying Forest to receive your certificate.</p><a class="btn" href="#grove">${icon('play')} Enter Greenhaven</a>`;
    return;
  }
  cleanupPage = mountCertificate(host);
}
