'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// ─── Swiss Tax Data 2026 ────────────────────────────────────────────────────
// Effective combined rates (federal + cantonal + communal) for main city,
// single person, reformed church. Source: ESTV, kantonal tax calculators.
// Rates are approximate — for exact figures use the official ESTV calculator.

const CANTONS: Record<string, { name: string; rates: [number, number][] }> = {
  AG: { name: 'Aargau (Aarau)',          rates: [[30000,0.072],[50000,0.130],[80000,0.170],[100000,0.196],[150000,0.238],[200000,0.263]] },
  AI: { name: 'Appenzell I.Rh.',         rates: [[30000,0.055],[50000,0.108],[80000,0.150],[100000,0.173],[150000,0.212],[200000,0.237]] },
  AR: { name: 'Appenzell A.Rh.',         rates: [[30000,0.064],[50000,0.122],[80000,0.165],[100000,0.188],[150000,0.230],[200000,0.255]] },
  BE: { name: 'Bern',                    rates: [[30000,0.082],[50000,0.152],[80000,0.210],[100000,0.238],[150000,0.284],[200000,0.317]] },
  BL: { name: 'Basel-Landschaft',        rates: [[30000,0.075],[50000,0.138],[80000,0.187],[100000,0.213],[150000,0.256],[200000,0.281]] },
  BS: { name: 'Basel-Stadt',             rates: [[30000,0.078],[50000,0.145],[80000,0.195],[100000,0.220],[150000,0.264],[200000,0.291]] },
  FR: { name: 'Fribourg',                rates: [[30000,0.076],[50000,0.140],[80000,0.188],[100000,0.214],[150000,0.258],[200000,0.283]] },
  GE: { name: 'Genf',                    rates: [[30000,0.085],[50000,0.158],[80000,0.218],[100000,0.247],[150000,0.295],[200000,0.330]] },
  GL: { name: 'Glarus',                  rates: [[30000,0.065],[50000,0.120],[80000,0.163],[100000,0.186],[150000,0.226],[200000,0.250]] },
  GR: { name: 'Graubünden (Chur)',       rates: [[30000,0.068],[50000,0.125],[80000,0.170],[100000,0.194],[150000,0.235],[200000,0.260]] },
  JU: { name: 'Jura',                    rates: [[30000,0.085],[50000,0.157],[80000,0.215],[100000,0.243],[150000,0.291],[200000,0.325]] },
  LU: { name: 'Luzern',                  rates: [[30000,0.072],[50000,0.134],[80000,0.180],[100000,0.206],[150000,0.249],[200000,0.274]] },
  NE: { name: 'Neuenburg',               rates: [[30000,0.083],[50000,0.154],[80000,0.211],[100000,0.240],[150000,0.287],[200000,0.320]] },
  NW: { name: 'Nidwalden',               rates: [[30000,0.055],[50000,0.102],[80000,0.140],[100000,0.161],[150000,0.197],[200000,0.219]] },
  OW: { name: 'Obwalden',                rates: [[30000,0.057],[50000,0.105],[80000,0.144],[100000,0.165],[150000,0.201],[200000,0.224]] },
  SG: { name: 'St. Gallen',             rates: [[30000,0.073],[50000,0.136],[80000,0.183],[100000,0.208],[150000,0.251],[200000,0.277]] },
  SH: { name: 'Schaffhausen',            rates: [[30000,0.069],[50000,0.128],[80000,0.174],[100000,0.198],[150000,0.240],[200000,0.265]] },
  SO: { name: 'Solothurn',               rates: [[30000,0.079],[50000,0.146],[80000,0.197],[100000,0.224],[150000,0.270],[200000,0.297]] },
  SZ: { name: 'Schwyz',                  rates: [[30000,0.050],[50000,0.092],[80000,0.125],[100000,0.143],[150000,0.175],[200000,0.196]] },
  TG: { name: 'Thurgau',                 rates: [[30000,0.070],[50000,0.130],[80000,0.177],[100000,0.202],[150000,0.245],[200000,0.270]] },
  TI: { name: 'Tessin (Bellinzona)',     rates: [[30000,0.070],[50000,0.130],[80000,0.178],[100000,0.203],[150000,0.246],[200000,0.271]] },
  UR: { name: 'Uri',                     rates: [[30000,0.058],[50000,0.108],[80000,0.148],[100000,0.169],[150000,0.206],[200000,0.229]] },
  VD: { name: 'Waadt (Lausanne)',        rates: [[30000,0.086],[50000,0.162],[80000,0.222],[100000,0.252],[150000,0.301],[200000,0.337]] },
  VS: { name: 'Wallis (Sitten)',         rates: [[30000,0.074],[50000,0.138],[80000,0.188],[100000,0.214],[150000,0.258],[200000,0.284]] },
  ZG: { name: 'Zug',                     rates: [[30000,0.032],[50000,0.059],[80000,0.082],[100000,0.095],[150000,0.118],[200000,0.134]] },
  ZH: { name: 'Zürich (Stadt)',          rates: [[30000,0.063],[50000,0.118],[80000,0.162],[100000,0.185],[150000,0.224],[200000,0.248]] },
};

// BVG employee share by age group (mandatory minimum, 2026)
const BVG_RATES: [number, number, number][] = [
  [17, 24, 0.000],
  [25, 34, 0.035],
  [35, 44, 0.050],
  [45, 54, 0.075],
  [55, 65, 0.090],
];
const BVG_COORDINATION = 25725;  // Koordinationsabzug 2026
const BVG_MIN_SALARY   = 22050;  // Eintrittsschwelle 2026
const BVG_MAX_SALARY   = 88200;  // obere Grenze versicherter Lohn 2026
const ALV_MAX_GROSS    = 148200; // ALV-Beitragspflichtig bis hier

// ─── Helpers ────────────────────────────────────────────────────────────────

function interpolateRate(gross: number, table: [number, number][]): number {
  if (gross <= table[0][0]) return table[0][1];
  if (gross >= table[table.length - 1][0]) return table[table.length - 1][1];
  for (let i = 0; i < table.length - 1; i++) {
    const [g1, r1] = table[i];
    const [g2, r2] = table[i + 1];
    if (gross >= g1 && gross <= g2) {
      return r1 + ((gross - g1) / (g2 - g1)) * (r2 - r1);
    }
  }
  return table[table.length - 1][1];
}

function getBvgRate(age: number): number {
  for (const [min, max, rate] of BVG_RATES) {
    if (age >= min && age <= max) return rate;
  }
  return 0;
}

function calcBvgAnnual(annualGross: number, age: number): number {
  if (annualGross < BVG_MIN_SALARY) return 0;
  const rate = getBvgRate(age);
  const koordiniert = Math.min(annualGross, BVG_MAX_SALARY) - BVG_COORDINATION;
  if (koordiniert <= 0) return 0;
  return koordiniert * rate;
}

function fmt(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u2019");
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + '%';
}

// ─── Calculation ─────────────────────────────────────────────────────────────

interface CalcResult {
  grossMonthly: number;
  grossAnnual: number;
  ahvMonthly: number;
  alvMonthly: number;
  nbuvMonthly: number;
  bvgMonthly: number;
  taxMonthly: number;
  totalMonthly: number;
  netMonthly: number;
  netAnnual: number;
  ahvRate: number;
  taxRate: number;
  taxRateBase: number; // rate before pensum hochrechnung
  netRate: number;
  pensum: number;
}

function runCalc(
  grossMonthly: number,         // tatsächlicher Teilzeit-Monatslohn (bereits pensum-skaliert)
  canton: string,
  age: number,
  months: number,
  nbuvRate: number,
  selfEmployed: boolean,
  quellensteuer: boolean = false,
  grossMonthlyFull: number = 0, // 100%-Monatslohn für Quellensteuer-Hochrechnung
): CalcResult {
  const grossAnnual     = grossMonthly * months;
  const grossAnnualFull = grossMonthlyFull > 0 ? grossMonthlyFull * months : grossAnnual;

  const ahvRate    = selfEmployed ? 0.101 : 0.053;
  const ahvAnnual  = grossAnnual * ahvRate;

  const alvAnnual  = selfEmployed ? 0 : Math.min(grossAnnual, ALV_MAX_GROSS) * 0.011;
  const nbuvAnnual = selfEmployed ? 0 : grossAnnual * nbuvRate;

  // BVG auf tatsächlichem Teilzeit-Lohn (Standard-Schwellenwerte)
  const bvgAnnual = selfEmployed ? 0 : (() => {
    if (grossAnnual < BVG_MIN_SALARY) return 0;
    const rate = getBvgRate(age);
    const koordiniert = Math.min(grossAnnual, BVG_MAX_SALARY) - BVG_COORDINATION;
    return koordiniert > 0 ? koordiniert * rate : 0;
  })();

  // Quellensteuer (B/L): Satz auf Basis 100%-Lohn, angewendet auf Ist-Lohn
  // Ordentliche Veranlagung (CH/C): Satz auf tatsächliches Einkommen
  const grossAnnualForRate = quellensteuer ? grossAnnualFull : grossAnnual;
  const taxRateBase = interpolateRate(grossAnnual,        CANTONS[canton]?.rates ?? CANTONS.ZH.rates);
  const taxRate     = interpolateRate(grossAnnualForRate, CANTONS[canton]?.rates ?? CANTONS.ZH.rates);
  const taxAnnual   = grossAnnual * taxRate;

  const totalAnnual = ahvAnnual + alvAnnual + nbuvAnnual + bvgAnnual + taxAnnual;
  const netAnnual   = grossAnnual - totalAnnual;

  return {
    grossMonthly,
    grossAnnual,
    ahvMonthly:    ahvAnnual / months,
    alvMonthly:    alvAnnual / months,
    nbuvMonthly:   nbuvAnnual / months,
    bvgMonthly:    bvgAnnual / months,
    taxMonthly:    taxAnnual / months,
    totalMonthly:  totalAnnual / months,
    netMonthly:    netAnnual / months,
    netAnnual,
    ahvRate,
    taxRate,
    taxRateBase,
    netRate: netAnnual / grossAnnual,
    pensum: grossMonthlyFull > 0 ? Math.round((grossMonthly / grossMonthlyFull) * 100) : 100,
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function DeductionBar({ label, amount, rate, color }: {
  label: string; amount: number; rate: number; color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-800">− CHF {fmt(amount)} <span className="text-gray-400 font-normal">({pct(rate)})</span></span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(rate * 400, 100)}%` }} />
      </div>
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BruttoNettoRechner() {
  const [grossInput, setGrossInput] = useState('8000');
  const [inputMode, setInputMode]   = useState<'monthly' | 'annual'>('monthly');
  const [canton, setCanton]         = useState('ZH');
  const [age, setAge]               = useState(35);
  const [months, setMonths]         = useState(12);
  const [nbuvRate, setNbuvRate]     = useState(0.008);
  const [pensum, setPensum]         = useState(100);
  const [quellensteuer, setQuellensteuer] = useState(false);
  const [selfEmployed, setSelfEmployed] = useState(false);
  const [activeTab, setActiveTab]   = useState<'main' | 'cantons' | 'permit' | 'month13' | 'freelancer'>('main');
  const [openFaq, setOpenFaq]       = useState<number | null>(null);

  const rawValue = useMemo(() => {
    const n = parseFloat(grossInput.replace(/[^\d.]/g, ''));
    return isNaN(n) || n <= 0 ? 0 : n;
  }, [grossInput]);

  // 100%-Monatslohn (wie eingegeben, ohne Pensum-Skalierung)
  const grossFull = useMemo(() => {
    if (inputMode === 'annual') return rawValue / months;
    return rawValue;
  }, [rawValue, inputMode, months]);

  // Tatsächlicher Monatslohn nach Pensum
  const gross = useMemo(() => grossFull * (pensum / 100), [grossFull, pensum]);

  // When switching mode, convert the current value so the number stays consistent
  function switchInputMode(newMode: 'monthly' | 'annual') {
    const n = parseFloat(grossInput.replace(/[^\d.]/g, ''));
    if (!isNaN(n) && n > 0) {
      if (newMode === 'annual' && inputMode === 'monthly') {
        setGrossInput(String(Math.round(n * months)));
      } else if (newMode === 'monthly' && inputMode === 'annual') {
        setGrossInput(String(Math.round(n / months)));
      }
    }
    setInputMode(newMode);
  }

  const result = useMemo(
    () => runCalc(gross, canton, age, months, nbuvRate, selfEmployed, quellensteuer, grossFull),
    [gross, grossFull, canton, age, months, nbuvRate, selfEmployed, quellensteuer],
  );

  const cantonComparison = useMemo(() => {
    return Object.entries(CANTONS)
      .map(([code]) => {
        const r = runCalc(gross, code, age, months, nbuvRate, selfEmployed, quellensteuer, grossFull);
        return { code, name: CANTONS[code].name, net: r.netMonthly, rate: r.taxRate };
      })
      .sort((a, b) => b.net - a.net);
  }, [gross, grossFull, age, months, nbuvRate, selfEmployed, quellensteuer]);

  const freelancerResult = useMemo(
    () => runCalc(gross, canton, age, months, nbuvRate, true, false, grossFull),
    [gross, grossFull, canton, age, months, nbuvRate],
  );

  const FAQS = [
    {
      q: 'Was wird vom Bruttolohn abgezogen?',
      a: 'In der Schweiz werden vom Bruttolohn abgezogen: AHV/IV/EO (5.3% Arbeitnehmeranteil), ALV (1.1% bis CHF 148\'200 Jahreslohn), NBUV (Nichtberufsunfallversicherung, ~0.8%), BVG/Pensionskasse (altersabhängig, 3.5–9%) und Einkommenssteuer (Quellensteuertarif je nach Kanton, Zivilstand). Nicht abgezogen: Krankenkasse (separat, durchschnittlich CHF 400–600/Monat).'
    },
    {
      q: 'Warum ist der Nettolohn in Zug so viel höher als in Genf?',
      a: 'Zug hat die tiefsten Steuern der Schweiz – der kombinierte Steuersatz (Bund + Kanton + Gemeinde) für einen Single mit CHF 100\'000 Jahreslohn beträgt nur rund 9.5%, verglichen mit ~24.7% in Genf. Bei CHF 8\'000 Brutto monatlich entspricht das einer jährlichen Differenz von rund CHF 18\'000 Nettolohn. Zug attrahiert deshalb viele Hochverdiener und Firmen.'
    },
    {
      q: 'Wie funktioniert Quellensteuer bei Ausweis B oder L?',
      a: 'Personen mit Aufenthaltsbewilligung B oder L zahlen Quellensteuer – die Steuer wird direkt vom Arbeitgeber vom Lohn abgezogen und an den Kanton überwiesen. Der Satz richtet sich nach dem monatlichen Bruttolohn, Kanton, Zivilstand und Konfession. Wer mehr als CHF 120\'000 Jahreslohn erzielt, muss eine ordentliche Steuererklärung einreichen (nachträgliche ordentliche Veranlagung).'
    },
    {
      q: 'Was ist der 13. Monatslohn und wie beeinflusst er das Netto?',
      a: 'Der 13. Monatslohn ist eine in der Schweiz weit verbreitete zusätzliche Monatszahlung, meist im Dezember oder aufgeteilt (Juni + Dezember). Er wird steuerlich wie normales Einkommen behandelt. Der jährliche Bruttolohn steigt auf 13× den Monatslohn – was die Steuerbelastung je nach Kanton spürbar erhöht (progressive Besteuerung). Beim Rechner: Schalten Sie oben auf "13 Monate" um, um den effektiven Monatsnettogehalt bei 13-Monatsvertrag zu sehen.'
    },
    {
      q: 'Was verdient ein Grenzgänger (G-Ausweis) netto?',
      a: 'Grenzgänger (Ausweis G) aus Deutschland, Frankreich und Italien zahlen eine Sonderquellensteuer (3% für Grenzgänger aus DE bei bestimmten Kantonen, 4.5% für FR). Dazu kommen die Schweizer Sozialabgaben (AHV/IV 5.3%, ALV 1.1%, BVG). In einigen Situationen muss auch im Wohnsitzland (Deutschland, Frankreich) Steuer bezahlt werden (Doppelbesteuerungsabkommen). Bitte kantonales Steueramt konsultieren.'
    },
    {
      q: 'Wie viel verdient ein Selbständiger (Einzelfirma) netto im Vergleich zu einem Angestellten?',
      a: 'Selbständige zahlen AHV/IV/EO 10.1% (doppelter Satz, da kein Arbeitgeber), keine ALV, keine NBUV, keine obligatorische BVG. Dazu kommt Einkommenssteuer auf den Reingewinn. Bei gleichem Bruttoumsatz ist der Selbständige durch den doppelten AHV-Satz (10.1% vs. 5.3% Arbeitnehmer) schlechtergestellt. Dafür gibt es kein Arbeitgeber, das 5.3% zusätzlich bezahlt – im Vollkostenvergleich ist ein Angestellter für den Arbeitgeber ~20–25% teurer als der Bruttolohn zeigt.'
    },
    {
      q: 'Wie genau ist dieser Rechner?',
      a: 'Dieser Rechner verwendet vereinfachte, aber realistische Steuersätze basierend auf ESTV-Daten und kantonalen Tarifen (2026). Er gibt eine gute Orientierung – für eine exakte Berechnung nutzen Sie den offiziellen ESTV-Quellensteuerrechner oder konsultieren Ihren Treuhänder. Nicht berücksichtigt: individuelle Abzüge (Berufskosten, Fahrtkosten), Kirchensteuer, Kinderabzüge, Beiträge an Säule 3a.'
    },
  ];

  const tabs = [
    { id: 'main',      label: 'Ergebnis' },
    { id: 'cantons',   label: 'Kantonsvergleich' },
    { id: 'permit',    label: 'Quellensteuer B/L' },
    { id: 'month13',   label: '13. Monatslohn' },
    { id: 'freelancer',label: 'Selbständig' },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* ── Hero input card ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <h1 className="text-xl font-bold text-white">Brutto-Netto-Rechner Schweiz 2026</h1>
          <p className="text-blue-100 text-sm mt-1">Alle Abzüge inkl. AHV, BVG, Quellensteuer – nach Kanton</p>
        </div>

        <div className="p-5 space-y-3">

          {/* ── Labels row ── */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[2fr_2fr_64px_96px] gap-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{pensum < 100 ? '100%-Lohn (CHF)' : 'Bruttolohn (CHF)'}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Kanton</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Alter</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pensum</p>
          </div>

          {/* ── Inputs row ── */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[2fr_2fr_64px_96px] gap-3 items-stretch">

            {/* Bruttolohn */}
            <div>
              <div className="flex h-11 rounded-xl border-2 border-gray-200 overflow-hidden focus-within:border-blue-500 transition-colors bg-white">
                <span className="flex items-center pl-3 pr-1.5 text-gray-400 font-medium text-sm shrink-0">CHF</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={grossInput}
                  onChange={e => setGrossInput(e.target.value)}
                  className="flex-1 text-lg font-bold focus:outline-none min-w-0"
                  placeholder={inputMode === 'monthly' ? '8000' : '96000'}
                />
                <div className="flex border-l border-gray-200 shrink-0 text-xs font-semibold">
                  <button
                    onClick={() => switchInputMode('monthly')}
                    className={`px-2.5 transition-colors ${inputMode === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                  >/Mt.</button>
                  <button
                    onClick={() => switchInputMode('annual')}
                    className={`px-2.5 transition-colors border-l border-gray-200 ${inputMode === 'annual' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                  >/Jahr</button>
                </div>
              </div>
              {inputMode === 'annual' && grossFull > 0 && pensum === 100 && (
                <p className="text-xs text-gray-400 mt-1">= CHF {fmt(grossFull)}/Monat (÷&nbsp;{months})</p>
              )}
              {gross > 0 && pensum < 100 && (
                <p className="text-xs text-amber-600 font-semibold mt-1">
                  → Ihr {pensum}%-Lohn: CHF {fmt(inputMode === 'annual' ? gross * months : gross)}{inputMode === 'annual' ? '/Jahr' : '/Mt.'}
                </p>
              )}
            </div>

            {/* Kanton */}
            <select
              value={canton}
              onChange={e => setCanton(e.target.value)}
              className="h-11 py-0 px-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm font-medium bg-white"
            >
              {Object.entries(CANTONS).sort((a,b) => a[1].name.localeCompare(b[1].name)).map(([code, data]) => (
                <option key={code} value={code}>{code} – {data.name.split(' ')[0]}</option>
              ))}
            </select>

            {/* Alter */}
            <input
              type="number"
              min={17} max={65}
              value={age}
              onChange={e => setAge(parseInt(e.target.value) || 35)}
              className="h-11 w-full py-0 px-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-medium text-center"
            />

            {/* Pensum */}
            <div className="relative">
              <input
                type="number"
                min={1} max={100}
                value={pensum}
                onChange={e => setPensum(Math.min(100, Math.max(1, parseInt(e.target.value) || 100)))}
                className={`h-11 w-full py-0 pl-2 pr-5 border-2 rounded-xl focus:outline-none transition-colors font-medium text-center ${pensum < 100 ? 'border-amber-400 bg-amber-50 focus:border-amber-500' : 'border-gray-200 focus:border-blue-500'}`}
              />
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold pointer-events-none">%</span>
            </div>
          </div>

          {/* ── Toggles row ── */}
          <div className="flex flex-wrap gap-2 pt-1">
            {([
              { label: '13. Monatslohn',     active: months === 13,  onClick: () => setMonths(months === 12 ? 13 : 12) },
              { label: 'Quellensteuer (B/L)', active: quellensteuer, onClick: () => setQuellensteuer(!quellensteuer) },
              { label: 'Selbständig',         active: selfEmployed,  onClick: () => setSelfEmployed(!selfEmployed) },
            ] as const).map(({ label, active, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                  active ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${active ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                  {active && <span className="w-1.5 h-1.5 bg-white rounded-full block" />}
                </span>
                {label}
              </button>
            ))}
          </div>

          {/* Quellensteuer + Teilzeit warning */}
          {quellensteuer && pensum < 100 && (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
              <span className="text-amber-500 shrink-0 mt-0.5">⚠</span>
              <span className="text-amber-800">
                <strong>Quellensteuer-Hochrechnung ({pensum}%):</strong> Steuersatz basiert auf hochgerechnetem 100%-Lohn (CHF {fmt(grossFull)}/Mt.) – effektiv {pct(result.taxRate)} statt {pct(result.taxRateBase)} bei Vollanstellung.
              </span>
            </div>
          )}
          {pensum < 100 && !quellensteuer && (
            <p className="text-xs text-gray-400">
              Steuer auf tatsächlichem Einkommen (ordentliche Veranlagung). Ausweis B/L? → «Quellensteuer (B/L)» aktivieren.
            </p>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto scrollbar-none -mb-px">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab: Main result ── */}
      {activeTab === 'main' && gross > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Net result */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-center">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nettolohn pro Monat</div>
            <div className="text-5xl font-extrabold text-gray-900 tracking-tight">
              CHF {fmt(result.netMonthly)}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              CHF {fmt(result.netAnnual)} pro Jahr · {pct(result.netRate)} von Brutto
            </div>
            <div className="mt-4 text-xs text-gray-400">
              Kanton {CANTONS[canton]?.name} · {age} Jahre · {months} Monatslöhne/Jahr
              {pensum < 100 ? ` · ${pensum}% Pensum` : ''}
              {selfEmployed ? ' · Selbständig' : ''}
            </div>

            {/* Visual net bar */}
            <div className="mt-5">
              <div className="flex text-xs text-gray-500 justify-between mb-1">
                <span>Netto {pct(result.netRate)}</span>
                <span>Abzüge {pct(result.totalMonthly / result.grossMonthly)}</span>
              </div>
              <div className="h-3 bg-red-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${result.netRate * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>CHF 0</span>
                <span>CHF {fmt(result.grossMonthly)}</span>
              </div>
            </div>
          </div>

          {/* Deduction breakdown */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Abzüge pro Monat</div>

            <div className="space-y-3">
              <DeductionBar
                label={selfEmployed ? 'AHV/IV/EO (10.1%, selbständig)' : 'AHV/IV/EO (5.3%)'}
                amount={result.ahvMonthly}
                rate={result.ahvMonthly / result.grossMonthly}
                color="bg-orange-400"
              />
              {!selfEmployed && (
                <>
                  <DeductionBar
                    label="ALV (1.1%)"
                    amount={result.alvMonthly}
                    rate={result.alvMonthly / result.grossMonthly}
                    color="bg-yellow-400"
                  />
                  <DeductionBar
                    label={`NBUV (${pct(nbuvRate)})`}
                    amount={result.nbuvMonthly}
                    rate={result.nbuvMonthly / result.grossMonthly}
                    color="bg-green-400"
                  />
                  {result.bvgMonthly > 0 && (
                    <DeductionBar
                      label={`BVG Pensionskasse (${pct(getBvgRate(age))})`}
                      amount={result.bvgMonthly}
                      rate={result.bvgMonthly / result.grossMonthly}
                      color="bg-teal-400"
                    />
                  )}
                </>
              )}
              <DeductionBar
                label={`Einkommenssteuer (${pct(result.taxRate)} eff.)`}
                amount={result.taxMonthly}
                rate={result.taxMonthly / result.grossMonthly}
                color="bg-red-400"
              />
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-between text-sm font-semibold">
              <span className="text-gray-700">Total Abzüge</span>
              <span className="text-red-600">− CHF {fmt(result.totalMonthly)}</span>
            </div>

            <p className="text-xs text-gray-400">
              Ohne Krankenversicherung (wird separat bezahlt, Ø CHF 430/Monat 2026).
              Steuersatz inkl. Bund, Kanton, Gemeinde. <a href="https://www.estv.admin.ch" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Exakter Wert: ESTV-Rechner</a>
            </p>
          </div>
        </div>
      )}

      {gross <= 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          Bitte Bruttolohn eingeben, um das Ergebnis zu sehen.
        </div>
      )}

      {/* ── Tab: Kantonsvergleich ── */}
      {activeTab === 'cantons' && gross > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Kantonsvergleich – CHF {fmt(gross)} Brutto/Monat</h2>
            <p className="text-sm text-gray-500 mt-0.5">Nettolohn nach Kanton (absteigend). Unterschied Zug vs. Genf: CHF {fmt(cantonComparison[0].net - cantonComparison[cantonComparison.length - 1].net)}/Monat</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kanton</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Steuersatz</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Netto/Monat</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Netto/Jahr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {cantonComparison.map((row, i) => (
                  <tr
                    key={row.code}
                    onClick={() => { setCanton(row.code); setActiveTab('main'); }}
                    className={`cursor-pointer transition-colors hover:bg-blue-50 ${row.code === canton ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-6 py-3 text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-4 py-3">
                      <span className={`font-medium ${row.code === canton ? 'text-blue-700' : 'text-gray-800'}`}>
                        {row.name}
                      </span>
                      {row.code === canton && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">aktuell</span>}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">{pct(row.rate)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">CHF {fmt(row.net)}</td>
                    <td className="px-6 py-3 text-right text-gray-600">CHF {fmt(row.net * months)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500">Klicken Sie auf eine Zeile, um den Kanton im Hauptrechner zu übernehmen. Steuersätze sind Schätzwerte inkl. Bund, Kanton, Gemeinde für die Kantonshauptstadt, Zivilstand ledig.</p>
          </div>
        </div>
      )}

      {/* ── Tab: Quellensteuer Ausweis B/L ── */}
      {activeTab === 'permit' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Quellensteuer für Ausweis B und L</h2>
            <p className="text-sm text-gray-600 mb-4">
              Personen mit Aufenthaltsbewilligung B oder L bezahlen Quellensteuer – direkt vom Arbeitgeber vom Lohn abgezogen.
              Die Berechnung im Hauptrechner verwendet die effektiven Quellensteuer-Sätze.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Ihr aktuelles Ergebnis ({CANTONS[canton]?.name.split(' ')[0]})</div>
                <div className="text-2xl font-bold text-gray-900">CHF {fmt(result.netMonthly)}</div>
                <div className="text-sm text-gray-500">Netto/Monat · Steuer {pct(result.taxRate)}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-xs font-semibold text-blue-700 uppercase mb-2">Wichtig zu wissen</div>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ab CHF 120'000/Jahr: ordentliche Veranlagung</li>
                  <li>• Satz richtet sich nach Kanton, Zivilstand, Konfession</li>
                  <li>• Nachträgliche Korrektur möglich (Antrag bis 31. März)</li>
                </ul>
              </div>
            </div>

            <h3 className="font-medium text-gray-800 mb-3">Quellensteuer-Sätze im Kantonsvergleich (Single, kein Kinder)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Kanton</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500">CHF 5'000/Mt.</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500">CHF 8'000/Mt.</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500">CHF 12'000/Mt.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {['ZG','SZ','NW','ZH','AG','LU','BS','BE','GE','VD'].map(code => (
                    <tr key={code} className={`${code === canton ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-2.5 font-medium text-gray-800">{CANTONS[code]?.name.split(' ')[0]}</td>
                      <td className="px-4 py-2.5 text-right text-gray-600">{pct(interpolateRate(60000, CANTONS[code].rates))}</td>
                      <td className="px-4 py-2.5 text-right text-gray-600">{pct(interpolateRate(96000, CANTONS[code].rates))}</td>
                      <td className="px-4 py-2.5 text-right text-gray-600">{pct(interpolateRate(144000, CANTONS[code].rates))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <InfoBox>
            <strong>Grenzgänger (Ausweis G):</strong> DE-Grenzgänger zahlen oft 3–4.5% Sonderquellensteuer in der Schweiz + reguläre Einkommensteuer in Deutschland. FR-Grenzgänger: 4.5% in CH. Details im Doppelbesteuerungsabkommen (DBA). Bitte kantonales Steueramt oder Treuhänder konsultieren.
          </InfoBox>
        </div>
      )}

      {/* ── Tab: 13. Monatslohn ── */}
      {activeTab === 'month13' && gross > 0 && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">13. Monatslohn – was ändert sich?</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[12, 13].map(m => {
                const r = runCalc(gross, canton, age, m, nbuvRate, selfEmployed, quellensteuer, grossFull);
                return (
                  <div key={m} className={`rounded-xl p-5 border-2 ${m === 13 ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${m === 13 ? 'text-blue-700' : 'text-gray-500'}`}>
                      {m === 12 ? 'Ohne 13. Monatslohn' : 'Mit 13. Monatslohn'}
                    </div>
                    <div className="text-3xl font-bold text-gray-900">CHF {fmt(r.netMonthly)}</div>
                    <div className="text-sm text-gray-600 mt-1">Netto pro Monat</div>
                    <div className="mt-3 text-sm space-y-1 text-gray-600">
                      <div className="flex justify-between"><span>Jahresbrutto</span><span className="font-medium">CHF {fmt(r.grossAnnual)}</span></div>
                      <div className="flex justify-between"><span>Jahres-Netto</span><span className="font-medium">CHF {fmt(r.netAnnual)}</span></div>
                      <div className="flex justify-between"><span>Steuersatz</span><span className="font-medium">{pct(r.taxRate)}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {(() => {
              const r12 = runCalc(gross, canton, age, 12, nbuvRate, selfEmployed, quellensteuer, grossFull);
              const r13 = runCalc(gross, canton, age, 13, nbuvRate, selfEmployed, quellensteuer, grossFull);
              const extraNet = r13.netAnnual - r12.netAnnual;
              const extraTax = (r13.taxMonthly - r12.taxMonthly) * 12;
              return (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
                  <strong className="text-amber-800">Was der 13. Monatslohn tatsächlich bringt:</strong>
                  <div className="mt-2 space-y-1 text-amber-700">
                    <div>+ CHF {fmt(gross)} Brutto mehr pro Jahr</div>
                    <div>− CHF {fmt(extraTax)} mehr Steuer pro Jahr (progressive Besteuerung)</div>
                    <div className="font-semibold">= CHF {fmt(extraNet)} Netto mehr im Jahr</div>
                  </div>
                  <p className="text-amber-600 text-xs mt-2">Der effektive Nettowert des 13. Monatslohns ist {pct(extraNet / gross)} des Brutto-Monatslohns – wegen Progression meist weniger als ein normaler Monatsnettogehalt.</p>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ── Tab: Selbständig ── */}
      {activeTab === 'freelancer' && gross > 0 && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Selbständig vs. Angestellt – Netto-Vergleich</h2>
            <p className="text-sm text-gray-500 mb-4">Gleicher Umsatz / Bruttolohn – unterschiedliche Abzüge</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: 'Angestellt', result: result, se: false },
                { label: 'Selbständig (Einzelfirma)', result: freelancerResult, se: true },
              ].map(({ label, result: r }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-5 space-y-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</div>
                  <div className="text-3xl font-bold text-gray-900">CHF {fmt(r.netMonthly)}</div>
                  <div className="text-sm text-gray-600">Netto/Monat</div>
                  <div className="border-t border-gray-200 pt-2 space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between"><span>AHV/IV/EO</span><span>− CHF {fmt(r.ahvMonthly)} ({pct(r.ahvRate)})</span></div>
                    {!r.ahvRate || r.ahvRate < 0.1 ? (
                      <>
                        <div className="flex justify-between"><span>ALV</span><span>− CHF {fmt(r.alvMonthly)}</span></div>
                        <div className="flex justify-between"><span>NBUV</span><span>− CHF {fmt(r.nbuvMonthly)}</span></div>
                        {r.bvgMonthly > 0 && <div className="flex justify-between"><span>BVG</span><span>− CHF {fmt(r.bvgMonthly)}</span></div>}
                      </>
                    ) : (
                      <div className="flex justify-between text-xs text-gray-400"><span>ALV/NBUV/BVG</span><span>nicht obligatorisch</span></div>
                    )}
                    <div className="flex justify-between"><span>Steuer ({pct(r.taxRate)})</span><span>− CHF {fmt(r.taxMonthly)}</span></div>
                  </div>
                </div>
              ))}
            </div>

            <InfoBox>
              <strong>Achtung Vollkostenvergleich:</strong> Als Angestellter trägt der Arbeitgeber zusätzlich 5.3% AHV + ALV + BVG (je nach Plan ~5–9% zusätzlich). Ein Angestellter mit CHF {fmt(gross)} Brutto kostet den Arbeitgeber effektiv CHF {fmt(gross * 1.13)}–{fmt(gross * 1.17)}/Monat. Als Selbständige/r tragen Sie diese Arbeitgeberanteile selbst – deshalb sollte Ihr Stundensatz entsprechend höher sein.
            </InfoBox>

            <div className="mt-4">
              <Link href="/artikel/stundensatz-berechnen" className="text-blue-600 text-sm font-medium hover:underline">
                → Stundensatz als Selbständige/r berechnen
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Methodology note ── */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-sm text-gray-600 space-y-2">
        <div className="font-semibold text-gray-700">Berechnungsmethodik</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-xs">
          <div><strong>AHV/IV/EO:</strong> 5.3% (AN) / 10.1% (Selbständige) – AHVG 2026</div>
          <div><strong>ALV:</strong> 1.1% bis CHF 148'200 Jahreslohn – AVIG Art. 3</div>
          <div><strong>NBUV:</strong> Standard 0.8%, anpassbar (UVG)</div>
          <div><strong>BVG:</strong> Gesetzliches Minimum nach Altersklasse, Koordinationsabzug CHF 25'725 (BVG Art. 8)</div>
          <div><strong>Steuern:</strong> Effektive Sätze (Bund+Kanton+Gemeinde), interpoliert nach ESTV-Tarifen 2026</div>
          <div><strong>Nicht enthalten:</strong> KK, Kirchensteuer, individuelle Abzüge, Säule 3a</div>
        </div>
        <p className="text-xs text-gray-500">Dieser Rechner dient der Orientierung. Für verbindliche Zahlen: <a href="https://www.estv.admin.ch/estv/de/home/direkte-bundessteuer/quellensteuer.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">ESTV Quellensteuerrechner</a> oder Treuhänder.</p>
      </div>

      {/* ── Related articles ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/artikel/stundensatz-berechnen',        label: 'Stundensatz berechnen',       sub: 'Als Selbständige/r richtig kalkulieren' },
          { href: '/artikel/ahv-selbststaendige',           label: 'AHV für Selbständige',         sub: 'Beiträge, Anmeldung, Fristen' },
          { href: '/artikel/steuern-selbststaendige',       label: 'Steuern für Selbständige',     sub: 'Alle Abzüge optimal nutzen' },
        ].map(item => (
          <Link key={item.href} href={item.href} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
            <div className="font-medium text-gray-800 group-hover:text-blue-700 text-sm">{item.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
          </Link>
        ))}
      </div>

      {/* ── FAQ ── */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Häufige Fragen zum Brutto-Netto-Rechner</h2>
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full text-left px-5 py-4 flex justify-between items-start gap-3 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800 text-sm">{faq.q}</span>
              <span className={`text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {openFaq === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
