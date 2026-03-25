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
  FR: { name: 'Fribourg',               rates: [[30000,0.076],[50000,0.140],[80000,0.188],[100000,0.214],[150000,0.258],[200000,0.283]] },
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

const SAEULE_3A_MAX = 40320; // 2026 maximum deduction for self-employed

// ─── Industry benchmarks ─────────────────────────────────────────────────────

const BENCHMARKS = [
  { branche: 'IT / Software',        min: 120, max: 200 },
  { branche: 'Beratung / Coaching',  min: 130, max: 250 },
  { branche: 'Marketing / Design',   min: 90,  max: 150 },
  { branche: 'Handwerk',             min: 80,  max: 130 },
  { branche: 'Treuhand / Recht',     min: 120, max: 220 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

/** Format number with Swiss apostrophe thousands separator */
function fmt(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2019');
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + '%';
}

// ─── Core calculation ─────────────────────────────────────────────────────────

interface StundensatzResult {
  // Time
  workingDaysTotal: number;      // 253
  availableDays: number;         // after Ferien + sick
  nonBillableDays: number;       // admin/akquise days
  billableDays: number;
  billableHours: number;

  // Money — annual
  jahreszielnetto: number;
  jahresgewinn: number;          // required gross profit
  ahvJahr: number;
  steuerJahr: number;
  taxRate: number;
  saeule3aJahr: number;
  betriebskostenJahr: number;
  requiredRevenue: number;       // jahresgewinn + betriebskosten
  nettoEinkommen: number;        // what user actually gets

  // Hourly / daily
  stundensatz: number;
  tagessatz: number;

  // Percentages for breakdown bar
  pctNetto: number;
  pctAhv: number;
  pctSteuer: number;
  pctBetriebs: number;
  pctSaeule3a: number;
}

function calculate(
  zielnettoMonthly: number,
  canton: string,
  ferientage: number,
  nichtFakturierbarPct: number,  // 0–1
  betriebskosten: number,
  saeule3a: boolean,
): StundensatzResult {
  // Step 1: Hours
  const workingDaysTotal = 253;
  const availableDays    = workingDaysTotal - ferientage - 5;
  const billableDays     = availableDays * (1 - nichtFakturierbarPct);
  const nonBillableDays  = availableDays - billableDays;
  const billableHours    = billableDays * 8;

  const jahreszielnetto = zielnettoMonthly * 12;

  // Step 2: Iterative gross calculation
  const cantonRates = CANTONS[canton]?.rates ?? CANTONS.ZH.rates;
  const saeule3aDeduction = saeule3a ? SAEULE_3A_MAX : 0;

  let gross = jahreszielnetto / 0.6;
  for (let i = 0; i < 20; i++) {
    const ahv = gross * 0.101;
    const taxable = Math.max(0, gross - ahv * 0.5 - saeule3aDeduction);
    const taxRate = interpolateRate(taxable, cantonRates);
    const tax = taxable * taxRate;
    const net = gross - ahv - tax;
    if (net <= 0) break;
    gross = gross * (jahreszielnetto / net);
  }

  const jahresgewinn = gross;
  const ahvJahr = jahresgewinn * 0.101;
  const taxableIncome = Math.max(0, jahresgewinn - ahvJahr * 0.5 - saeule3aDeduction);
  const taxRate = interpolateRate(taxableIncome, cantonRates);
  const steuerJahr = taxableIncome * taxRate;
  const saeule3aJahr = saeule3a ? SAEULE_3A_MAX : 0;
  const nettoEinkommen = jahresgewinn - ahvJahr - steuerJahr;

  // Step 3–4: Revenue and rate
  const requiredRevenue = jahresgewinn + betriebskosten;
  const stundensatz     = billableHours > 0 ? requiredRevenue / billableHours : 0;
  const tagessatz       = stundensatz * 8;

  // Percentages for bar (relative to total revenue)
  const total = requiredRevenue > 0 ? requiredRevenue : 1;
  const pctNetto     = nettoEinkommen / total;
  const pctAhv       = ahvJahr / total;
  const pctSteuer    = steuerJahr / total;
  const pctBetriebs  = betriebskosten / total;
  const pctSaeule3a  = saeule3aJahr / total;

  return {
    workingDaysTotal,
    availableDays,
    nonBillableDays,
    billableDays,
    billableHours,
    jahreszielnetto,
    jahresgewinn,
    ahvJahr,
    steuerJahr,
    taxRate,
    saeule3aJahr,
    betriebskostenJahr: betriebskosten,
    requiredRevenue,
    nettoEinkommen,
    stundensatz,
    tagessatz,
    pctNetto,
    pctAhv,
    pctSteuer,
    pctBetriebs,
    pctSaeule3a,
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SliderRow({
  label,
  sublabel,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
}: {
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatValue: (v: number) => string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-warm-800">{label}</p>
          {sublabel && <p className="text-xs text-warm-500">{sublabel}</p>}
        </div>
        <span className="text-sm font-bold text-accent-dark whitespace-nowrap">
          {formatValue(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-warm-400">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

function CostBar({
  label,
  amount,
  pctOfTotal,
  color,
  bgColor,
}: {
  label: string;
  amount: number;
  pctOfTotal: number;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${color}`} />
          <span className="text-warm-700">{label}</span>
        </div>
        <div className="text-right">
          <span className="font-semibold text-warm-800">CHF {fmt(amount)}</span>
          <span className="text-warm-400 text-xs ml-2">({pct(pctOfTotal)})</span>
        </div>
      </div>
      <div className="h-3 bg-warm-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${bgColor} transition-all duration-300`}
          style={{ width: `${Math.min(Math.max(pctOfTotal * 100, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

type BenchmarkStatus = 'unter' | 'markt' | 'ueber';

function getBenchmarkStatus(stundensatz: number, min: number, max: number): BenchmarkStatus {
  if (stundensatz < min) return 'unter';
  if (stundensatz > max) return 'ueber';
  return 'markt';
}

function BenchmarkBadge({ status }: { status: BenchmarkStatus }) {
  if (status === 'unter') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
        unter Markt
      </span>
    );
  }
  if (status === 'markt') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-warm-700">
        <span className="w-1.5 h-1.5 rounded-full bg-warm-500 inline-block" />
        marktüblich
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-accent-light text-accent-dark">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 inline-block" />
      über Markt
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StundensatzRechner() {
  const [zielnettoMonthly, setZielnettoMonthly] = useState(6000);
  const [canton, setCanton]                     = useState('ZH');
  const [ferientage, setFerientage]             = useState(25);
  const [nichtFakturierbar, setNichtFakturierbar] = useState(30); // percent int 10-50
  const [betriebskosten, setBetriebskosten]     = useState(12000);
  const [saeule3a, setSaeule3a]                 = useState(true);

  const result = useMemo(() => calculate(
    zielnettoMonthly,
    canton,
    ferientage,
    nichtFakturierbar / 100,
    betriebskosten,
    saeule3a,
  ), [zielnettoMonthly, canton, ferientage, nichtFakturierbar, betriebskosten, saeule3a]);

  // Day breakdown for visual
  const sickAndVacation = ferientage + 5;
  const nonBillableInt  = Math.round(result.nonBillableDays);
  const billableInt     = Math.round(result.billableDays);
  const totalAvailable  = result.workingDaysTotal;

  const pctVacSick    = sickAndVacation / totalAvailable;
  const pctNonBill    = nonBillableInt / totalAvailable;
  const pctBillable   = billableInt / totalAvailable;

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-warm-900 mb-2">
          Stundensatz Rechner Schweiz 2026
        </h1>
        <p className="text-warm-600 max-w-2xl mx-auto text-sm sm:text-base">
          Berechne deinen Mindeststundensatz als Selbständiger — inkl. AHV, Steuern,
          Betriebskosten und Säule 3a, für alle 26 Kantone.
        </p>
      </div>

      {/* ── Brutto/Netto Erklärung ── */}
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-md p-5">
        <p className="text-sm font-bold text-amber-900 mb-3">Kurz erklärt: Brutto vs. Netto für Selbständige</p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-warm-white rounded-md p-3 border border-amber-100">
            <div className="text-lg mb-1">💼</div>
            <p className="font-semibold text-warm-800">Stundensatz</p>
            <p className="text-warm-500 text-xs mt-1">Was du dem Kunden in Rechnung stellst. Davon gehen noch AHV, Steuern und Kosten weg.</p>
          </div>
          <div className="bg-warm-white rounded-md p-3 border border-amber-100">
            <div className="text-lg mb-1">📊</div>
            <p className="font-semibold text-warm-800">Jahresgewinn (Brutto)</p>
            <p className="text-warm-500 text-xs mt-1">Was nach Betriebskosten übrig bleibt — aber vor AHV und Steuern. Noch nicht dein Geld.</p>
          </div>
          <div className="bg-warm-white rounded-md p-3 border border-amber-100 ring-2 ring-blue-400">
            <div className="text-lg mb-1">✅</div>
            <p className="font-semibold text-accent-dark">Nettoeinkommen</p>
            <p className="text-warm-500 text-xs mt-1">Was wirklich auf deinem Konto landet — nach AHV (10.1%) und Einkommenssteuern. Das kannst du ausgeben.</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 font-medium">
          <span>Stundensatz (Kundenrechnung)</span>
          <span>→</span>
          <span>− Betriebskosten</span>
          <span>→</span>
          <span>Jahresgewinn (Brutto)</span>
          <span>→</span>
          <span>− AHV − Steuern</span>
          <span>→</span>
          <span className="text-accent-dark font-bold">Netto ✓</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── INPUTS ── */}
        <div className="space-y-6">
          <div className="bg-warm-white rounded-md border border-warm-200 p-6 shadow-sm space-y-6">
            <h2 className="font-bold text-warm-900 text-lg">Deine Angaben</h2>

            {/* Zielnettoeinkommen */}
            <SliderRow
              label="Gewünschtes Nettoeinkommen pro Monat"
              sublabel="✅ Was am Ende auf deinem Konto landet — nach AHV & Steuern. Das kannst du ausgeben."
              value={zielnettoMonthly}
              min={2000}
              max={20000}
              step={500}
              onChange={setZielnettoMonthly}
              formatValue={(v) => `CHF ${fmt(v)}`}
            />

            {/* Kanton */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-warm-800">Kanton</p>
              <select
                value={canton}
                onChange={(e) => setCanton(e.target.value)}
                className="w-full border border-warm-200 rounded-md px-4 py-2.5 text-sm text-warm-800 bg-warm-white focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {Object.entries(CANTONS).map(([key, c]) => (
                  <option key={key} value={key}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Ferientage */}
            <SliderRow
              label="Ferientage pro Jahr"
              value={ferientage}
              min={10}
              max={35}
              step={1}
              onChange={setFerientage}
              formatValue={(v) => `${v} Tage`}
            />

            {/* Nicht-fakturierbare Zeit */}
            <SliderRow
              label="Nicht-fakturierbare Zeit"
              sublabel="Admin, Akquise, Weiterbildung"
              value={nichtFakturierbar}
              min={10}
              max={50}
              step={5}
              onChange={setNichtFakturierbar}
              formatValue={(v) => `${v}%`}
            />

            {/* Betriebskosten */}
            <SliderRow
              label="Jahresbetriebskosten"
              sublabel="Büro, Software, Versicherungen, Buchhaltung..."
              value={betriebskosten}
              min={0}
              max={60000}
              step={1000}
              onChange={setBetriebskosten}
              formatValue={(v) => `CHF ${fmt(v)}`}
            />

            {/* Säule 3a */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-md bg-warm-50 border border-green-100">
              <div>
                <p className="text-sm font-semibold text-warm-800">Säule 3a einzahlen</p>
                <p className="text-xs text-warm-500 mt-0.5">
                  Max. CHF {fmt(SAEULE_3A_MAX)}/Jahr — steuerlich abzugsfähig
                </p>
              </div>
              <button
                role="switch"
                aria-checked={saeule3a}
                onClick={() => setSaeule3a((v) => !v)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  saeule3a ? 'bg-warm-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-warm-white shadow ring-0 transition duration-200 ease-in-out ${
                    saeule3a ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── RESULTS ── */}
        <div className="space-y-6">
          {/* Big numbers */}
          <div className="bg-accent rounded-md p-6 text-white shadow-lg">
            <p className="text-blue-200 text-xs font-medium mb-1">💼 Was du dem Kunden in Rechnung stellst</p>
            <p className="text-blue-200 text-sm font-medium mb-3">Dein Mindeststundensatz</p>
            <div className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-1">
              CHF {fmt(result.stundensatz)}
            </div>
            <p className="text-blue-200 text-sm">pro Stunde — das steht auf deiner Rechnung an den Kunden</p>

            <div className="mt-4 pt-4 border-t border-blue-500 flex items-center gap-2 text-xs text-blue-200">
              <span className="bg-accent-500 rounded px-2 py-0.5">von CHF {fmt(result.stundensatz)}/Std.</span>
              <span>landen</span>
              <span className="bg-warm-white text-accent-dark font-bold rounded px-2 py-0.5">CHF {fmt(zielnettoMonthly)}/Mt.</span>
              <span>auf deinem Konto</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-blue-500">
              <div>
                <p className="text-blue-200 text-xs mb-0.5">Tagessatz (8 Std.)</p>
                <p className="font-bold text-lg">CHF {fmt(result.tagessatz)}</p>
              </div>
              <div>
                <p className="text-blue-200 text-xs mb-0.5">Jahresumsatz nötig</p>
                <p className="font-bold text-lg">CHF {fmt(result.requiredRevenue)}</p>
              </div>
              <div>
                <p className="text-blue-200 text-xs mb-0.5">Fakturierb. Std.</p>
                <p className="font-bold text-lg">{fmt(result.billableHours)} Std.</p>
              </div>
            </div>
          </div>

          {/* Cost breakdown bars */}
          <div className="bg-warm-white rounded-md border border-warm-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-warm-900">Kostenaufschlüsselung</h3>
            <p className="text-xs text-warm-500">
              Anteil am benötigten Jahresumsatz CHF {fmt(result.requiredRevenue)}
            </p>

            <div className="space-y-3">
              <CostBar
                label="Nettoeinkommen"
                amount={result.nettoEinkommen}
                pctOfTotal={result.pctNetto}
                color="bg-accent-500"
                bgColor="bg-accent-500"
              />
              <CostBar
                label="AHV/IV/EO (10.1%)"
                amount={result.ahvJahr}
                pctOfTotal={result.pctAhv}
                color="bg-orange-400"
                bgColor="bg-orange-400"
              />
              <CostBar
                label="Einkommenssteuern"
                amount={result.steuerJahr}
                pctOfTotal={result.pctSteuer}
                color="bg-red-400"
                bgColor="bg-red-400"
              />
              <CostBar
                label="Betriebskosten"
                amount={result.betriebskostenJahr}
                pctOfTotal={result.pctBetriebs}
                color="bg-gray-400"
                bgColor="bg-gray-400"
              />
              {saeule3a && (
                <CostBar
                  label="Säule 3a (gespart)"
                  amount={result.saeule3aJahr}
                  pctOfTotal={result.pctSaeule3a}
                  color="bg-warm-500"
                  bgColor="bg-warm-500"
                />
              )}
            </div>

            {/* Stacked bar */}
            <div className="mt-4">
              <div className="h-5 rounded-full overflow-hidden flex">
                <div
                  className="bg-accent-500 transition-all duration-300"
                  style={{ width: `${result.pctNetto * 100}%` }}
                  title="Nettoeinkommen"
                />
                <div
                  className="bg-orange-400 transition-all duration-300"
                  style={{ width: `${result.pctAhv * 100}%` }}
                  title="AHV"
                />
                <div
                  className="bg-red-400 transition-all duration-300"
                  style={{ width: `${result.pctSteuer * 100}%` }}
                  title="Steuern"
                />
                <div
                  className="bg-gray-400 transition-all duration-300"
                  style={{ width: `${result.pctBetriebs * 100}%` }}
                  title="Betriebskosten"
                />
                {saeule3a && (
                  <div
                    className="bg-warm-500 transition-all duration-300"
                    style={{ width: `${result.pctSaeule3a * 100}%` }}
                    title="Säule 3a"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Jahresübersicht table ── */}
      <div className="mt-6 bg-warm-white rounded-md border border-warm-200 p-6 shadow-sm">
        <h3 className="font-bold text-warm-900 mb-1">Von der Kundenrechnung zu deinem Nettolohn</h3>
        <p className="text-xs text-warm-500 mb-5">So fliesst jeder Franken den du verrechnest</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-200">
                <th className="text-left py-2 pr-4 font-semibold text-warm-700">Schritt</th>
                <th className="text-right py-2 pr-4 font-semibold text-warm-700">CHF/Jahr</th>
                <th className="text-right py-2 font-semibold text-warm-700">CHF/Monat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="bg-accent-50">
                <td className="py-2.5 pr-4 font-semibold text-blue-900">
                  💼 Umsatz — was du dem Kunden verrechnest
                </td>
                <td className="py-2.5 pr-4 text-right font-bold text-accent-dark">
                  CHF {fmt(result.requiredRevenue)}
                </td>
                <td className="py-2.5 text-right font-bold text-accent-dark">
                  CHF {fmt(result.requiredRevenue / 12)}
                </td>
              </tr>
              <tr className="bg-warm-50">
                <td className="py-2.5 pr-4 text-warm-500 pl-4">
                  ↳ − Betriebskosten <span className="text-xs">(Büro, Software, Versicherungen...)</span>
                </td>
                <td className="py-2.5 pr-4 text-right text-red-600">
                  − CHF {fmt(result.betriebskostenJahr)}
                </td>
                <td className="py-2.5 text-right text-warm-500">
                  − CHF {fmt(result.betriebskostenJahr / 12)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-warm-800">
                  = Jahresgewinn <span className="text-xs font-normal text-warm-400">(auch «Brutto» genannt — noch nicht dein Geld)</span>
                </td>
                <td className="py-2.5 pr-4 text-right font-semibold text-warm-900">
                  CHF {fmt(result.jahresgewinn)}
                </td>
                <td className="py-2.5 text-right text-warm-600">
                  CHF {fmt(result.jahresgewinn / 12)}
                </td>
              </tr>
              <tr className="bg-orange-50">
                <td className="py-2.5 pr-4 text-orange-700 pl-4">
                  ↳ − AHV/IV/EO <span className="text-xs">(Altersvorsorge, Pflicht für Selbständige: 10.1%)</span>
                </td>
                <td className="py-2.5 pr-4 text-right text-orange-600">
                  − CHF {fmt(result.ahvJahr)}
                </td>
                <td className="py-2.5 text-right text-orange-500">
                  − CHF {fmt(result.ahvJahr / 12)}
                </td>
              </tr>
              <tr className="bg-red-50">
                <td className="py-2.5 pr-4 text-red-700 pl-4">
                  ↳ − Einkommenssteuer <span className="text-xs">({pct(result.taxRate)} eff., Kanton {CANTONS[canton]?.name.split(' ')[0]})</span>
                </td>
                <td className="py-2.5 pr-4 text-right text-red-600">
                  − CHF {fmt(result.steuerJahr)}
                </td>
                <td className="py-2.5 text-right text-red-500">
                  − CHF {fmt(result.steuerJahr / 12)}
                </td>
              </tr>
              {saeule3a && (
                <tr className="bg-warm-50">
                  <td className="py-2.5 pr-4 text-warm-700 pl-4">
                    ↳ Säule 3a <span className="text-xs">(gespart für Pensionierung, steuerlich abzugsfähig)</span>
                  </td>
                  <td className="py-2.5 pr-4 text-right text-warm-700">
                    CHF {fmt(result.saeule3aJahr)}
                  </td>
                  <td className="py-2.5 text-right text-warm-700">
                    CHF {fmt(result.saeule3aJahr / 12)}
                  </td>
                </tr>
              )}
              <tr className="border-t-2 border-blue-300 bg-accent-50">
                <td className="py-3 pr-4 font-bold text-blue-900 text-base">
                  ✅ Nettoeinkommen — was auf deinem Konto landet
                </td>
                <td className="py-3 pr-4 text-right font-bold text-accent-dark text-base">
                  CHF {fmt(result.nettoEinkommen)}
                </td>
                <td className="py-3 text-right font-bold text-accent-dark text-base">
                  CHF {fmt(result.nettoEinkommen / 12)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-warm-400 mt-3">
          Kanton {CANTONS[canton]?.name}. AHV-Satz 10.1% für Selbständigerwerbende (2026).
          {saeule3a && ` Säule 3a CHF ${fmt(SAEULE_3A_MAX)} reduziert das steuerbare Einkommen.`}
        </p>
      </div>

      {/* ── Time breakdown ── */}
      <div className="mt-6 bg-warm-white rounded-md border border-warm-200 p-6 shadow-sm">
        <h3 className="font-bold text-warm-900 mb-4">
          Zeitverteilung — {result.workingDaysTotal} Arbeitstage/Jahr
        </h3>
        <div className="space-y-3">
          {/* Stacked bar */}
          <div className="h-8 rounded-md overflow-hidden flex text-xs font-semibold">
            <div
              className="bg-gray-300 flex items-center justify-center text-warm-700 transition-all duration-300"
              style={{ width: `${pctVacSick * 100}%` }}
              title={`Ferien & Krankheit: ${sickAndVacation} Tage`}
            >
              {pctVacSick > 0.08 && `${sickAndVacation}T`}
            </div>
            <div
              className="bg-orange-300 flex items-center justify-center text-orange-800 transition-all duration-300"
              style={{ width: `${pctNonBill * 100}%` }}
              title={`Admin/Akquise: ${nonBillableInt} Tage`}
            >
              {pctNonBill > 0.08 && `${nonBillableInt}T`}
            </div>
            <div
              className="bg-accent-500 flex items-center justify-center text-white transition-all duration-300"
              style={{ width: `${pctBillable * 100}%` }}
              title={`Fakturierbar: ${billableInt} Tage`}
            >
              {pctBillable > 0.08 && `${billableInt}T`}
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-300 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-warm-700">Ferien & Krankheit</p>
                <p className="text-warm-500 text-xs">
                  {ferientage} Ferien + 5 Krankheit = {sickAndVacation} Tage
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-300 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-warm-700">Admin / Akquise</p>
                <p className="text-warm-500 text-xs">
                  {nichtFakturierbar}% von {Math.round(result.availableDays)} Tagen = {nonBillableInt} Tage
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-warm-700 text-accent-dark">Fakturierbare Tage</p>
                <p className="text-warm-500 text-xs">
                  {billableInt} Tage = {fmt(result.billableHours)} Stunden
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Industry benchmarks ── */}
      <div className="mt-6 bg-warm-white rounded-md border border-warm-200 p-6 shadow-sm">
        <h3 className="font-bold text-warm-900 mb-1">Branchenvergleich</h3>
        <p className="text-xs text-warm-500 mb-4">
          Dein Stundensatz CHF {fmt(result.stundensatz)} verglichen mit Schweizer Marktpreisen 2026
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-200">
                <th className="text-left py-2 pr-4 font-semibold text-warm-700">Branche</th>
                <th className="text-left py-2 pr-4 font-semibold text-warm-700">Markt CHF/Std.</th>
                <th className="text-left py-2 font-semibold text-warm-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {BENCHMARKS.map(({ branche, min, max }) => {
                const status = getBenchmarkStatus(result.stundensatz, min, max);
                return (
                  <tr key={branche} className="hover:bg-warm-50 transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-warm-800">{branche}</td>
                    <td className="py-2.5 pr-4 text-warm-600">
                      CHF {min}–{max}
                    </td>
                    <td className="py-2.5">
                      <BenchmarkBadge status={status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-warm-400 mt-3">
          Quellen: Freelancer.ch, experteer.ch, Marktbeobachtungen 2025/2026.
          Tatsächliche Sätze variieren je nach Erfahrung, Spezialisierung und Region.
        </p>
      </div>

      {/* ── Info box & CTA ── */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="bg-accent-50 border border-accent-light rounded-md p-5 text-sm text-accent-dark">
          <p className="font-semibold mb-2">Wichtige Hinweise</p>
          <ul className="space-y-1.5 text-accent-dark">
            <li>• Steuersätze sind Näherungswerte (Hauptort, ledig, 2026)</li>
            <li>• AHV-Satz 10.1% für Selbständigerwerbende</li>
            <li>• Ohne MWST (ab CHF 100'000 Umsatz: +8.1%)</li>
            <li>• Krankentaggeldversicherung nicht eingerechnet</li>
            <li>• Reserve für Ausfallzeiten empfohlen: +10–15%</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-ink to-ink-soft rounded-md p-5 text-white flex flex-col justify-between">
          <div>
            <p className="font-bold text-lg mb-1">Mehr über Stundensätze</p>
            <p className="text-blue-100 text-sm">
              Verhandlungstipps, Preismodelle und Branchenwerte im Ratgeber-Artikel.
            </p>
          </div>
          <Link
            href="/artikel/stundensatz-berechnen"
            className="mt-4 inline-block bg-warm-white text-accent-dark text-sm font-bold px-5 py-2.5 rounded-md hover:bg-accent-50 transition-all shadow"
          >
            Zum Artikel →
          </Link>
        </div>
      </div>
    </section>
  );
}
