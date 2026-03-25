'use client';

import { useState, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Position {
  id: string;
  beschreibung: string;
  menge: string;
  einheit: string;
  einzelpreis: string;
}

interface FormState {
  // Sender
  logo: string;
  sFirma: string; sName: string; sAdr: string; sPlz: string; sOrt: string;
  sTel: string; sEmail: string; sMwstNr: string; sIban: string;
  // Empfänger
  eFirma: string; eName: string; eAdr: string; ePlz: string; eOrt: string;
  // Dokument
  nummer: string; datum: string; betreff: string; frist: string;
  mwstRate: string; showMwst: boolean;
  showRabatt: boolean; rabattPct: string;
  notiz: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const chf = (n: number) =>
  'CHF\u00a0' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '\u2019');

const uid = () => Math.random().toString(36).slice(2, 9);

const newPos = (): Position => ({
  id: uid(), beschreibung: '', menge: '1', einheit: 'Std.', einzelpreis: '',
});

const INITIAL: FormState = {
  logo: '', sFirma: '', sName: '', sAdr: '', sPlz: '', sOrt: '',
  sTel: '', sEmail: '', sMwstNr: '', sIban: '',
  eFirma: '', eName: '', eAdr: '', ePlz: '', eOrt: '',
  nummer: 'AB-2026-001',
  datum: '',
  betreff: '', frist: '30', mwstRate: '8.1', showMwst: true,
  showRabatt: false, rabattPct: '', notiz: '',
};

const EXAMPLE: FormState = {
  logo: '', sFirma: 'Muster Design GmbH', sName: 'Max Muster',
  sAdr: 'Bahnhofstrasse 42', sPlz: '8001', sOrt: 'Zürich',
  sTel: '+41 44 123 45 67', sEmail: 'max@muster-design.ch',
  sMwstNr: 'CHE-123.456.789 MWST', sIban: 'CH56 0483 5012 3456 7800 9',
  eFirma: 'Kunde AG', eName: 'Anna Müller',
  eAdr: 'Musterstrasse 5', ePlz: '9000', eOrt: 'St. Gallen',
  nummer: 'AB-2026-001', datum: '19.03.2026',
  betreff: 'Webseite Redesign & SEO-Optimierung',
  frist: '30', mwstRate: '8.1', showMwst: true,
  showRabatt: false, rabattPct: '',
  notiz: 'Vielen Dank für Ihren Auftrag. Wir freuen uns auf die Zusammenarbeit und melden uns in Kürze für einen Kickoff-Termin. Bei Fragen stehen wir gerne zur Verfügung.',
};

const EXAMPLE_POSITIONS: Position[] = [
  { id: uid(), beschreibung: 'Webdesign & UX-Konzept', menge: '15', einheit: 'Std.', einzelpreis: '150' },
  { id: uid(), beschreibung: 'WordPress-Entwicklung', menge: '20', einheit: 'Std.', einzelpreis: '130' },
  { id: uid(), beschreibung: 'SEO-Grundoptimierung', menge: '1', einheit: 'Psch.', einzelpreis: '800' },
  { id: uid(), beschreibung: 'Projektleitung & Koordination', menge: '5', einheit: 'Std.', einzelpreis: '140' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const inputCls =
  'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-300 bg-white transition-all';

function FormSection({
  num, icon, title, sub, children,
}: {
  num: string; icon: string; title: string; sub: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
          {num}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span>{icon}</span>
            <span className="font-bold text-gray-900 text-sm">{title}</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({
  label, hint, children, wide,
}: {
  label: string; hint?: string; children: React.ReactNode; wide?: boolean;
}) {
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

// ─── Document Preview ─────────────────────────────────────────────────────────

interface DocProps extends FormState {
  positionen: Position[];
  subtotal: number;
  nachRabatt: number;
  mwstBetrag: number;
  total: number;
  rabattBetrag: number;
}

function PreviewDoc(p: DocProps) {
  const hasAnyContent = p.logo || p.sFirma || p.sName || p.eFirma || p.eName ||
    p.positionen.some(pos => pos.beschreibung);

  if (!hasAnyContent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-8">
        <div className="text-6xl mb-5">📄</div>
        <p className="font-semibold text-gray-600 text-sm mb-2">
          Hier erscheint deine Auftragsbestätigung
        </p>
        <p className="text-xs text-gray-400 leading-relaxed max-w-52">
          Fülle das Formular links aus – das Dokument aktualisiert sich sofort.
          Oder klicke auf <strong>«Beispiel laden»</strong>.
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-7 text-gray-900"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif', fontSize: '10px', lineHeight: '1.55' }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div style={{ maxWidth: '180px' }}>
          {p.logo
            ? <img src={p.logo} alt="Logo" style={{ maxHeight: '44px', maxWidth: '180px', display: 'block', objectFit: 'contain' }} />
            : <div style={{ fontSize: '14px', fontWeight: 700 }}>{p.sFirma || p.sName || ''}</div>
          }
        </div>
        <div className="text-right" style={{ fontSize: '9px', color: '#555', lineHeight: '1.6' }}>
          {p.logo && (p.sFirma || p.sName) && (
            <div style={{ fontWeight: 600, color: '#111', fontSize: '10px' }}>{p.sFirma || p.sName}</div>
          )}
          {p.sAdr && <div>{p.sAdr}</div>}
          {(p.sPlz || p.sOrt) && <div>{p.sPlz} {p.sOrt}</div>}
          {p.sTel && <div>{p.sTel}</div>}
          {p.sEmail && <div>{p.sEmail}</div>}
          {p.sMwstNr && <div style={{ marginTop: '3px' }}>MWST-Nr: {p.sMwstNr}</div>}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd', marginBottom: '14px' }} />

      {/* Empfänger + Meta */}
      <div className="flex justify-between items-start mb-5">
        <div style={{ lineHeight: '1.65' }}>
          {p.eFirma && <div style={{ fontWeight: 600 }}>{p.eFirma}</div>}
          {p.eName && <div style={!p.eFirma ? { fontWeight: 600 } : {}}>{p.eName}</div>}
          {p.eAdr && <div>{p.eAdr}</div>}
          {(p.ePlz || p.eOrt) && <div>{p.ePlz} {p.eOrt}</div>}
          {!p.eFirma && !p.eName && (
            <div style={{ color: '#bbb', fontStyle: 'italic' }}>Kundenangaben...</div>
          )}
        </div>
        <div className="text-right" style={{ fontSize: '9px', color: '#666', lineHeight: '1.65' }}>
          <div>{p.sOrt ? `${p.sOrt}, ` : ''}{p.datum}</div>
          {p.nummer && <div>Nr. {p.nummer}</div>}
        </div>
      </div>

      {/* Titel */}
      <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '3px', letterSpacing: '-0.2px' }}>
        AUFTRAGSBESTÄTIGUNG
      </div>
      {p.betreff && (
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#333', marginBottom: '12px' }}>
          Betreff: {p.betreff}
        </div>
      )}
      {!p.betreff && <div style={{ height: '12px' }} />}

      {/* Anrede */}
      <div style={{ marginBottom: '12px', color: '#333' }}>
        {p.eName
          ? <>Sehr geehrte/r {p.eName},</>
          : <span style={{ color: '#bbb', fontStyle: 'italic' }}>Sehr geehrte/r ...,</span>
        }<br />
        wir bestätigen hiermit den folgenden Auftrag:
      </div>

      {/* Positionen Tabelle */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            {['Pos', 'Beschreibung', 'Menge', 'Einh.', 'Preis', 'Betrag'].map((h, i) => (
              <th key={h} style={{
                padding: '5px 8px', fontSize: '8px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.4px', color: '#666',
                borderBottom: '1px solid #ddd',
                textAlign: i >= 2 ? 'right' : 'left',
                ...(i === 0 ? { width: '22px' } : {}),
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {p.positionen.map((pos, i) => {
            const betrag = (parseFloat(pos.menge) || 0) * (parseFloat(pos.einzelpreis) || 0);
            return (
              <tr key={pos.id} style={{ background: i % 2 === 1 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '6px 8px', borderBottom: '0.5px solid #eee', color: '#888' }}>{i + 1}</td>
                <td style={{ padding: '6px 8px', borderBottom: '0.5px solid #eee' }}>
                  {pos.beschreibung || <span style={{ color: '#ccc', fontStyle: 'italic' }}>Beschreibung...</span>}
                </td>
                <td style={{ padding: '6px 8px', borderBottom: '0.5px solid #eee', textAlign: 'right' }}>{pos.menge}</td>
                <td style={{ padding: '6px 8px', borderBottom: '0.5px solid #eee', textAlign: 'right' }}>{pos.einheit}</td>
                <td style={{ padding: '6px 8px', borderBottom: '0.5px solid #eee', textAlign: 'right' }}>
                  {pos.einzelpreis ? `CHF ${parseFloat(pos.einzelpreis).toFixed(2)}` : '—'}
                </td>
                <td style={{ padding: '6px 8px', borderBottom: '0.5px solid #eee', textAlign: 'right', fontWeight: 600 }}>
                  {betrag > 0 ? chf(betrag) : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ marginLeft: 'auto', width: '190px', marginBottom: '14px' }}>
        <table style={{ width: '100%', fontSize: '9px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '2px 0', color: '#666' }}>Subtotal</td>
              <td style={{ padding: '2px 0', textAlign: 'right', color: '#666' }}>{chf(p.subtotal)}</td>
            </tr>
            {p.showRabatt && p.rabattBetrag > 0 && (
              <tr>
                <td style={{ padding: '2px 0', color: '#2a8a2a' }}>Rabatt {p.rabattPct}%</td>
                <td style={{ padding: '2px 0', textAlign: 'right', color: '#2a8a2a' }}>− {chf(p.rabattBetrag)}</td>
              </tr>
            )}
            {p.showMwst && (
              <tr>
                <td style={{ padding: '2px 0', color: '#666' }}>MWST {p.mwstRate}%</td>
                <td style={{ padding: '2px 0', textAlign: 'right', color: '#666' }}>{chf(p.mwstBetrag)}</td>
              </tr>
            )}
            <tr style={{ borderTop: '1.5px solid #111' }}>
              <td style={{ padding: '5px 0 2px', fontWeight: 700, fontSize: '11px' }}>Total CHF</td>
              <td style={{ padding: '5px 0 2px', textAlign: 'right', fontWeight: 700, fontSize: '11px' }}>{chf(p.total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Zahlungskonditionen */}
      <div style={{ fontSize: '9px', color: '#555', borderTop: '0.5px solid #ddd', paddingTop: '10px', marginBottom: '10px', lineHeight: '1.7' }}>
        <span style={{ fontWeight: 600, color: '#333' }}>Zahlungsfrist:</span> {p.frist} Tage netto nach Rechnungsstellung
        {p.sIban && <><br /><span style={{ fontWeight: 600, color: '#333' }}>IBAN:</span> {p.sIban}</>}
      </div>

      {/* Bemerkungen */}
      {p.notiz && (
        <div style={{ fontSize: '9px', color: '#555', background: '#f9f9f9', borderRadius: '4px', padding: '8px 10px', marginBottom: '12px' }}>
          {p.notiz}
        </div>
      )}

      {/* Grussformel */}
      <div style={{ fontSize: '10px', marginTop: '18px' }}>
        Mit freundlichen Grüssen<br />
        <div style={{ marginTop: '16px', fontWeight: 600 }}>{p.sFirma || p.sName || '—'}</div>
        {p.sFirma && p.sName && <div style={{ fontSize: '9px', color: '#777' }}>{p.sName}</div>}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '24px', paddingTop: '8px', borderTop: '0.5px solid #eee', fontSize: '8px', color: '#ccc', textAlign: 'center' }}>
        Erstellt mit selbständig-schweiz.ch/tools/auftragsbestaetigung
      </div>
    </div>
  );
}

// ─── Print HTML generator ─────────────────────────────────────────────────────

function buildPrintDoc(p: DocProps): string {
  const fmt = (n: number) =>
    'CHF\u00a0' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '\'');

  const rows = p.positionen.map((pos, i) => {
    const betrag = (parseFloat(pos.menge) || 0) * (parseFloat(pos.einzelpreis) || 0);
    return `<tr style="${i % 2 === 1 ? 'background:#fafafa' : ''}">
      <td style="padding:7pt 10pt;border-bottom:0.5pt solid #eee;color:#999">${i + 1}</td>
      <td style="padding:7pt 10pt;border-bottom:0.5pt solid #eee">${pos.beschreibung || '–'}</td>
      <td style="padding:7pt 10pt;border-bottom:0.5pt solid #eee;text-align:center">${pos.menge}</td>
      <td style="padding:7pt 10pt;border-bottom:0.5pt solid #eee;text-align:center">${pos.einheit}</td>
      <td style="padding:7pt 10pt;border-bottom:0.5pt solid #eee;text-align:right">${pos.einzelpreis ? 'CHF ' + parseFloat(pos.einzelpreis).toFixed(2) : '–'}</td>
      <td style="padding:7pt 10pt;border-bottom:0.5pt solid #eee;text-align:right;font-weight:600">${betrag > 0 ? fmt(betrag) : '–'}</td>
    </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Auftragsbestätigung ${p.nummer}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:white}
body{
  font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;
  font-size:10pt;line-height:1.55;color:#1a1a1a;
  padding:22mm 22mm 28mm 22mm;
}
@media print{
  body{padding:0}
  @page{size:A4;margin:22mm 22mm 28mm 22mm}
}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18pt}
.hdr-left img{max-height:44pt;max-width:160pt;object-fit:contain}
.hdr-left .brand{font-size:13pt;font-weight:700}
.hdr-right{text-align:right;font-size:9pt;color:#555;line-height:1.65}
.hdr-right .firm{font-weight:600;font-size:10pt;color:#111}
hr.div{border:none;border-top:1pt solid #ddd;margin:0 0 14pt 0}
.addr-row{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18pt}
.recipient{font-size:10pt;line-height:1.65}
.recipient .rname{font-weight:600}
.meta-blk{text-align:right;font-size:9pt;color:#666;line-height:1.65}
.doc-title{font-size:16pt;font-weight:700;letter-spacing:-0.3pt;margin-bottom:3pt}
.doc-betreff{font-size:10pt;font-weight:600;color:#333;margin-bottom:14pt}
.salut{font-size:10pt;margin-bottom:14pt;color:#333}
table.pos{width:100%;border-collapse:collapse;margin:8pt 0 12pt 0}
table.pos th{
  background:#f4f4f4;padding:7pt 10pt;font-size:8pt;font-weight:600;
  text-transform:uppercase;letter-spacing:0.4pt;color:#666;
  border-bottom:1pt solid #ddd
}
table.pos th.r,table.pos td.r{text-align:right}
table.pos th.c,table.pos td.c{text-align:center;width:50pt}
table.pos th.pos-col{width:30pt}
.totals{margin-left:auto;width:200pt;margin-top:8pt}
.totals table{width:100%}
.totals td{padding:3pt 0;font-size:10pt}
.totals td.tv{text-align:right}
.totals tr.ttl td{border-top:1.5pt solid #111;padding-top:6pt;font-weight:700;font-size:11pt}
.payment{margin-top:14pt;font-size:9pt;color:#555;border-top:0.5pt solid #ddd;padding-top:10pt;line-height:1.7}
.payment strong{color:#333}
.notes{margin-top:10pt;font-size:9pt;color:#555;background:#f9f9f9;border-radius:4pt;padding:8pt 10pt}
.closing{margin-top:24pt;font-size:10pt}
.closing-sig{margin-top:18pt;font-weight:600}
.closing-sub{font-size:9pt;color:#777}
.footer{margin-top:32pt;border-top:0.5pt solid #eee;padding-top:7pt;font-size:8pt;color:#bbb;text-align:center}
.disc{color:#2a8a2a}
</style>
</head>
<body>
<div class="hdr">
  <div class="hdr-left">
    ${p.logo
      ? `<img src="${p.logo}" alt="Logo">`
      : `<div class="brand">${p.sFirma || p.sName || ''}</div>`}
  </div>
  <div class="hdr-right">
    ${p.logo && (p.sFirma || p.sName) ? `<div class="firm">${p.sFirma || p.sName}</div>` : ''}
    ${p.sAdr ? `<div>${p.sAdr}</div>` : ''}
    ${p.sPlz || p.sOrt ? `<div>${p.sPlz} ${p.sOrt}</div>` : ''}
    ${p.sTel ? `<div>${p.sTel}</div>` : ''}
    ${p.sEmail ? `<div>${p.sEmail}</div>` : ''}
    ${p.sMwstNr ? `<div style="margin-top:4pt">MWST-Nr: ${p.sMwstNr}</div>` : ''}
  </div>
</div>
<hr class="div">
<div class="addr-row">
  <div class="recipient">
    ${p.eFirma ? `<div class="rname">${p.eFirma}</div>` : ''}
    ${p.eName ? `<div${!p.eFirma ? ' class="rname"' : ''}>${p.eName}</div>` : ''}
    ${p.eAdr ? `<div>${p.eAdr}</div>` : ''}
    ${p.ePlz || p.eOrt ? `<div>${p.ePlz} ${p.eOrt}</div>` : ''}
  </div>
  <div class="meta-blk">
    <div>${p.sOrt ? p.sOrt + ', ' : ''}${p.datum}</div>
    ${p.nummer ? `<div>Nr. ${p.nummer}</div>` : ''}
  </div>
</div>
<div class="doc-title">AUFTRAGSBESTÄTIGUNG</div>
${p.betreff ? `<div class="doc-betreff">Betreff: ${p.betreff}</div>` : '<div style="height:14pt"></div>'}
<div class="salut">
  ${p.eName ? `Sehr geehrte/r ${p.eName},` : 'Sehr geehrte Damen und Herren,'}<br>
  wir bestätigen hiermit den folgenden Auftrag:
</div>
<table class="pos">
  <thead>
    <tr>
      <th class="pos-col">Pos</th>
      <th>Beschreibung</th>
      <th class="c">Menge</th>
      <th class="c">Einheit</th>
      <th class="r">Einzelpreis</th>
      <th class="r">Betrag CHF</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>
<div class="totals">
  <table>
    <tr><td>Subtotal</td><td class="tv">${fmt(p.subtotal)}</td></tr>
    ${p.showRabatt && p.rabattBetrag > 0
      ? `<tr class="disc"><td>Rabatt ${p.rabattPct}%</td><td class="tv">− ${fmt(p.rabattBetrag)}</td></tr>`
      : ''}
    ${p.showMwst
      ? `<tr><td>MWST ${p.mwstRate}%</td><td class="tv">${fmt(p.mwstBetrag)}</td></tr>`
      : ''}
    <tr class="ttl"><td>Total CHF</td><td class="tv">${fmt(p.total)}</td></tr>
  </table>
</div>
<div class="payment">
  <strong>Zahlungsfrist:</strong> ${p.frist} Tage netto nach Rechnungsstellung<br>
  ${p.sIban ? `<strong>IBAN:</strong> ${p.sIban}` : ''}
</div>
${p.notiz ? `<div class="notes">${p.notiz}</div>` : ''}
<div class="closing">
  Mit freundlichen Grüssen
  <div class="closing-sig">${p.sFirma || p.sName || ''}</div>
  ${p.sFirma && p.sName ? `<div class="closing-sub">${p.sName}</div>` : ''}
</div>
<div class="footer">
  Erstellt mit selbständig-schweiz.ch/tools/auftragsbestaetigung – kostenlos &amp; ohne Anmeldung
</div>
<script>window.onload=function(){window.print()}<\/script>
</body>
</html>`;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AuftragsbestaetigungGenerator() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [positionen, setPositionen] = useState<Position[]>([newPos()]);
  const [showExample, setShowExample] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  // Set today's date client-side only (avoids SSR/hydration mismatch)
  useEffect(() => {
    set('datum', new Date().toLocaleDateString('de-CH'));
  }, []);

  // Logo upload
  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => set('logo', ev.target?.result as string);
    r.readAsDataURL(f);
  };

  // Positionen
  const updatePos = (id: string, k: keyof Position, v: string) =>
    setPositionen(ps => ps.map(p => p.id === id ? { ...p, [k]: v } : p));

  // Calculations
  const subtotal = positionen.reduce(
    (s, p) => s + (parseFloat(p.menge) || 0) * (parseFloat(p.einzelpreis) || 0), 0
  );
  const rabattBetrag = form.showRabatt && form.rabattPct
    ? (parseFloat(form.rabattPct) / 100) * subtotal : 0;
  const nachRabatt = subtotal - rabattBetrag;
  const mwstBetrag = form.showMwst ? nachRabatt * (parseFloat(form.mwstRate) / 100) : 0;
  const total = nachRabatt + mwstBetrag;

  const docProps: DocProps = {
    ...form, positionen, subtotal, nachRabatt, mwstBetrag, total, rabattBetrag,
  };

  // Load example
  const loadExample = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="210" height="50" viewBox="0 0 210 50">
      <rect x="2" y="6" width="10" height="38" rx="3" fill="#2563eb"/>
      <rect x="16" y="14" width="10" height="30" rx="3" fill="#3b82f6"/>
      <rect x="30" y="22" width="10" height="22" rx="3" fill="#93c5fd"/>
      <text x="52" y="25" font-family="Helvetica Neue,Arial,sans-serif" font-size="15" font-weight="700" fill="#111827" letter-spacing="-0.3">Muster Design</text>
      <text x="53" y="40" font-family="Helvetica Neue,Arial,sans-serif" font-size="8.5" fill="#9ca3af" letter-spacing="2">GmbH</text>
    </svg>`;
    const logo = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    setForm({ ...EXAMPLE, logo });
    setPositionen(EXAMPLE_POSITIONS.map(p => ({ ...p, id: uid() })));
    setShowExample(true);
  };

  // Print
  const handlePrint = () => {
    const html = buildPrintDoc(docProps);
    const w = window.open('', '_blank');
    if (!w) { alert('Bitte Pop-up-Blocker für diese Seite deaktivieren.'); return; }
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ─── Sticky Toolbar ─────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm sm:text-base leading-tight truncate">
              Auftragsbestätigung Generator Schweiz
            </p>
            <p className="text-xs text-gray-400 hidden sm:block">
              Formular ausfüllen → Vorschau erscheint sofort → kostenlos als PDF downloaden
            </p>
            <p className="text-xs text-green-600 font-medium hidden sm:flex items-center gap-1 mt-0.5">
              🔒 Keine Daten werden gespeichert – alles bleibt in deinem Browser
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!showExample && (
              <button
                onClick={loadExample}
                className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-300 px-3 py-2 rounded-xl transition-all"
              >
                ✨ Beispiel laden
              </button>
            )}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm"
            >
              <span>📄</span>
              <span className="hidden sm:inline">Als PDF downloaden</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Banners ────────────────────────────────────────────── */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 pt-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3.5 flex items-start gap-3">
          <span className="text-xl shrink-0 mt-0.5">💡</span>
          <div className="text-sm text-blue-800">
            <strong>Was ist eine Auftragsbestätigung?</strong> Du bestätigst deinem Kunden schriftlich,
            dass du seinen Auftrag angenommen hast – mit allen Details zu Leistungen, Preis und Zahlungsfrist.
            Das schützt dich bei Streitigkeiten. <strong>Ab ca. CHF 500 Auftragswert empfohlen.</strong>
          </div>
        </div>
        <div className="sm:w-72 bg-green-50 border border-green-200 rounded-2xl px-5 py-3.5 flex items-center gap-3">
          <span className="text-2xl shrink-0">🔒</span>
          <div className="text-sm text-green-800">
            <strong>Deine Daten bleiben bei dir.</strong> Alles läuft lokal in deinem Browser –
            nichts wird gespeichert oder übertragen.
          </div>
        </div>
      </div>

      {/* ─── Main Layout ────────────────────────────────────────── */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-5 lg:grid lg:grid-cols-[500px_1fr] lg:gap-7 items-start">

        {/* ═══════════════ FORM ═══════════════════════════════════ */}
        <div className="space-y-4 mb-6 lg:mb-0">

          {/* Mobile: Beispiel laden */}
          {!showExample && (
            <button
              onClick={loadExample}
              className="sm:hidden w-full flex items-center justify-center gap-2 text-sm text-blue-600 border-2 border-dashed border-blue-200 rounded-2xl py-3 font-semibold"
            >
              ✨ Beispiel laden – so siehst du das fertige Dokument
            </button>
          )}

          {/* 1 · Deine Angaben */}
          <FormSection num="1" icon="🏢" title="Deine Angaben" sub="Dein Name und deine Firmenadresse – erscheinen oben rechts im Dokument">

            {/* Logo */}
            <div className="mb-4">
              {form.logo ? (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <img src={form.logo} alt="Logo" className="h-10 object-contain" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700">Logo hochgeladen ✓</p>
                    <p className="text-xs text-gray-400">Erscheint oben links im Dokument</p>
                  </div>
                  <button onClick={() => set('logo', '')} className="text-xs text-red-500 hover:text-red-700 font-medium">
                    Entfernen
                  </button>
                </div>
              ) : (
                <label className="group flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition-all">
                  <span className="text-2xl">🖼️</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">
                      Logo hochladen <span className="text-gray-400 font-normal">(optional)</span>
                    </p>
                    <p className="text-xs text-gray-400">PNG oder JPG, max. 2 MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleLogo} className="hidden" />
                </label>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Firmenname" wide>
                <input className={inputCls} value={form.sFirma} onChange={e => set('sFirma', e.target.value)} placeholder="z.B. Muster GmbH" />
              </Field>
              <Field label="Dein Name" wide>
                <input className={inputCls} value={form.sName} onChange={e => set('sName', e.target.value)} placeholder="z.B. Max Muster" />
              </Field>
              <Field label="Strasse und Nr." wide>
                <input className={inputCls} value={form.sAdr} onChange={e => set('sAdr', e.target.value)} placeholder="z.B. Bahnhofstrasse 1" />
              </Field>
              <Field label="PLZ">
                <input className={inputCls} value={form.sPlz} onChange={e => set('sPlz', e.target.value)} placeholder="8001" />
              </Field>
              <Field label="Ort">
                <input className={inputCls} value={form.sOrt} onChange={e => set('sOrt', e.target.value)} placeholder="Zürich" />
              </Field>
              <Field label="Telefon">
                <input className={inputCls} value={form.sTel} onChange={e => set('sTel', e.target.value)} placeholder="+41 44 123 45 67" />
              </Field>
              <Field label="E-Mail">
                <input className={inputCls} value={form.sEmail} onChange={e => set('sEmail', e.target.value)} placeholder="hallo@firma.ch" />
              </Field>
              <Field label="MWST-Nummer" hint="Nur wenn du MWST-pflichtig bist (ab CHF 100'000 Jahresumsatz)" wide>
                <input className={inputCls} value={form.sMwstNr} onChange={e => set('sMwstNr', e.target.value)} placeholder="CHE-123.456.789 MWST" />
              </Field>
              <Field label="IBAN" hint="Deine Kontonummer für die Zahlung des Kunden" wide>
                <input className={inputCls} value={form.sIban} onChange={e => set('sIban', e.target.value)} placeholder="CH00 0000 0000 0000 0000 0" />
              </Field>
            </div>
          </FormSection>

          {/* 2 · Kundenangaben */}
          <FormSection num="2" icon="👤" title="Kundenangaben" sub="An wen geht diese Auftragsbestätigung?">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Firma des Kunden" wide>
                <input className={inputCls} value={form.eFirma} onChange={e => set('eFirma', e.target.value)} placeholder="z.B. Kunde AG (optional)" />
              </Field>
              <Field label="Name" wide>
                <input className={inputCls} value={form.eName} onChange={e => set('eName', e.target.value)} placeholder="z.B. Anna Müller" />
              </Field>
              <Field label="Strasse und Nr." wide>
                <input className={inputCls} value={form.eAdr} onChange={e => set('eAdr', e.target.value)} placeholder="z.B. Musterstrasse 5" />
              </Field>
              <Field label="PLZ">
                <input className={inputCls} value={form.ePlz} onChange={e => set('ePlz', e.target.value)} placeholder="9000" />
              </Field>
              <Field label="Ort">
                <input className={inputCls} value={form.eOrt} onChange={e => set('eOrt', e.target.value)} placeholder="St. Gallen" />
              </Field>
            </div>
          </FormSection>

          {/* 3 · Auftragsinformationen */}
          <FormSection num="3" icon="📋" title="Auftragsinformationen" sub="Auftragsnummer, Datum und Betreff">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Auftragsnummer" hint="Deine eigene Nummerierung, z.B. AB-2026-001">
                <input className={inputCls} value={form.nummer} onChange={e => set('nummer', e.target.value)} placeholder="AB-2026-001" />
              </Field>
              <Field label="Datum">
                <input className={inputCls} value={form.datum} onChange={e => set('datum', e.target.value)} placeholder="19.03.2026" />
              </Field>
              <Field label="Betreff / Projekttitel" wide>
                <input className={inputCls} value={form.betreff} onChange={e => set('betreff', e.target.value)} placeholder="z.B. Webseite Redesign, Marketingkampagne Q2" />
              </Field>
            </div>
          </FormSection>

          {/* 4 · Leistungen */}
          <FormSection num="4" icon="📦" title="Leistungen" sub="Was leistest du? Füge jede Position einzeln ein – Beträge werden automatisch berechnet.">
            {/* Column headers */}
            <div className="hidden sm:grid grid-cols-[1fr_52px_76px_86px_24px] gap-2 mb-2 px-1">
              {['Beschreibung', 'Menge', 'Einheit', 'Preis/Einheit', ''].map((h, i) => (
                <span key={i} className={`text-xs font-semibold text-gray-400 uppercase tracking-wide ${i === 3 ? 'text-right' : ''}`}>
                  {h}
                </span>
              ))}
            </div>

            <div className="space-y-2.5">
              {positionen.map((pos, i) => (
                <div key={pos.id}>
                  {/* Mobile: label above */}
                  <div className="sm:hidden text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                    Position {i + 1}
                  </div>
                  <div className="grid grid-cols-[1fr_52px_76px_86px_24px] gap-2 items-center">
                    <input
                      value={pos.beschreibung}
                      onChange={e => updatePos(pos.id, 'beschreibung', e.target.value)}
                      placeholder={i === 0 ? "z.B. Webdesign & Entwicklung" : `Beschreibung Position ${i + 1}`}
                      className={inputCls}
                    />
                    <input
                      type="number" min="0" value={pos.menge}
                      onChange={e => updatePos(pos.id, 'menge', e.target.value)}
                      className={inputCls + ' text-center'}
                    />
                    <select
                      value={pos.einheit}
                      onChange={e => updatePos(pos.id, 'einheit', e.target.value)}
                      className={inputCls}
                    >
                      {['Std.', 'Tage', 'Stk.', 'Psch.', 'km', 'Monate', 'Wochen', 'm²'].map(u => (
                        <option key={u}>{u}</option>
                      ))}
                    </select>
                    <input
                      type="number" min="0" step="0.01" value={pos.einzelpreis}
                      onChange={e => updatePos(pos.id, 'einzelpreis', e.target.value)}
                      placeholder="150.00"
                      className={inputCls + ' text-right'}
                    />
                    <button
                      onClick={() => setPositionen(ps => ps.filter(x => x.id !== pos.id))}
                      disabled={positionen.length === 1}
                      className="flex items-center justify-center text-gray-300 hover:text-red-400 disabled:invisible text-xl leading-none transition-colors"
                      title="Löschen"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3.5 flex items-center justify-between">
              <button
                onClick={() => setPositionen(ps => [...ps, newPos()])}
                className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                <span className="text-lg leading-none">+</span> Position hinzufügen
              </button>
              {subtotal > 0 && (
                <p className="text-sm text-gray-500">
                  Subtotal: <span className="font-bold text-gray-900">{chf(subtotal)}</span>
                </p>
              )}
            </div>
          </FormSection>

          {/* 5 · Konditionen */}
          <FormSection num="5" icon="💳" title="Konditionen & Abschluss" sub="Zahlungsfrist, MWST und optionale Bemerkungen">
            <div className="space-y-4">

              {/* Zahlungsfrist + MWST */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Zahlungsfrist" hint="Innert wie vielen Tagen muss der Kunde zahlen?">
                  <select value={form.frist} onChange={e => set('frist', e.target.value)} className={inputCls}>
                    {['10', '14', '20', '30', '45', '60'].map(d => (
                      <option key={d} value={d}>{d} Tage netto</option>
                    ))}
                  </select>
                </Field>
                <Field label="MWST-Satz" hint="Nur wenn du MWST-pflichtig bist">
                  <select
                    value={form.showMwst ? form.mwstRate : 'none'}
                    onChange={e => {
                      if (e.target.value === 'none') { set('showMwst', false); }
                      else { set('showMwst', true); set('mwstRate', e.target.value); }
                    }}
                    className={inputCls}
                  >
                    <option value="none">Keine MWST</option>
                    <option value="8.1">8.1% (Normalsatz)</option>
                    <option value="3.8">3.8% (Beherbergung)</option>
                    <option value="2.6">2.6% (Reduziert)</option>
                  </select>
                </Field>
              </div>

              {/* Rabatt */}
              <div>
                <label className="flex items-center gap-2.5 cursor-pointer group mb-2">
                  <input
                    type="checkbox" checked={form.showRabatt}
                    onChange={e => set('showRabatt', e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">
                    Rabatt gewähren
                  </span>
                </label>
                {form.showRabatt && (
                  <div className="flex items-center gap-2 ml-6">
                    <input
                      type="number" min="0" max="100" value={form.rabattPct}
                      onChange={e => set('rabattPct', e.target.value)}
                      placeholder="5"
                      className={inputCls + ' w-24'}
                    />
                    <span className="text-sm text-gray-600">%</span>
                    {rabattBetrag > 0 && (
                      <span className="text-sm font-semibold text-green-600">
                        = − {chf(rabattBetrag)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Bemerkungen */}
              <Field label="Bemerkungen (optional)" hint="z.B. Dankesworte, Hinweise auf AGB, Lieferfristen">
                <textarea
                  value={form.notiz}
                  onChange={e => set('notiz', e.target.value)}
                  placeholder="z.B. Vielen Dank für Ihren Auftrag. Wir freuen uns auf die Zusammenarbeit."
                  className={inputCls + ' resize-none'}
                  rows={3}
                />
              </Field>
            </div>

            {/* Totals summary */}
            {subtotal > 0 && (
              <div className="mt-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                  Zusammenfassung
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span><span>{chf(subtotal)}</span>
                  </div>
                  {form.showRabatt && rabattBetrag > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Rabatt {form.rabattPct}%</span><span>− {chf(rabattBetrag)}</span>
                    </div>
                  )}
                  {form.showMwst && (
                    <div className="flex justify-between text-gray-600">
                      <span>MWST {form.mwstRate}%</span><span>+ {chf(mwstBetrag)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-blue-200 mt-2">
                    <span>Total CHF</span><span>{chf(total)}</span>
                  </div>
                </div>
              </div>
            )}
          </FormSection>

          {/* Mobile download CTA */}
          <button
            onClick={handlePrint}
            className="w-full lg:hidden bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-base shadow-lg transition-all"
          >
            📄 Als PDF downloaden – kostenlos & ohne Anmeldung
          </button>

        </div>

        {/* ═══════════════ PREVIEW ════════════════════════════════ */}
        <div className="lg:sticky lg:top-32">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Live-Vorschau
            </p>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              ↓ PDF speichern
            </button>
          </div>

          {/* Paper */}
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 ring-1 ring-black/5">
            <PreviewDoc {...docProps} />
          </div>

          <p className="text-center text-xs text-gray-300 mt-3">
            Erstellt mit{' '}
            <span className="text-gray-400 font-medium">selbständig-schweiz.ch</span>
            {' '}– kostenlos &amp; ohne Anmeldung
          </p>
        </div>

      </div>
    </div>
  );
}
