/**
 * Fase lunar con aproximación de Meeus (Astronomical Algorithms).
 * Fechas pensadas para mostrar en America/Argentina/Buenos_Aires.
 */

export type MoonPhaseId =
  | 'new'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent';

export interface MoonPhaseInfo {
  id: MoonPhaseId;
  label: string;
  /** Valor compacto del tile (1–2 renglones) */
  shortLines: [string, string?];
  /** 0 = nueva, 0.5 = llena, ~1 = vuelve a nueva */
  cycle: number;
  /** Iluminación 0–1 */
  illumination: number;
}

export interface MoonMilestone {
  date: Date;
  /** Días restantes (fracción) */
  daysUntil: number;
}

const AR_TZ = 'America/Argentina/Buenos_Aires';
const MS_PER_DAY = 86400000;

export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  const cycle = moonCycle(date);
  const illumination = 0.5 * (1 - Math.cos(2 * Math.PI * cycle));
  const id = phaseIdFromCycle(cycle);
  return {
    id,
    label: phaseLabel(id),
    shortLines: phaseShortLines(id),
    cycle,
    illumination,
  };
}

/** ¿Hoy (calendario AR) es el día de la luna llena? */
export function isFullMoonDay(date: Date = new Date()): boolean {
  const nearest = getNearestFullMoon(date);
  return arDateKey(date) === arDateKey(nearest.date);
}

export function getNextFullMoon(date: Date = new Date()): MoonMilestone {
  return nextPhaseAfter(date, 0.5);
}

export function getNextNewMoon(date: Date = new Date()): MoonMilestone {
  return nextPhaseAfter(date, 0);
}

export function arDateKey(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: AR_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function formatArDateTime(date: Date): { weekday: string; day: number; month: string; time: string } {
  const weekday = new Intl.DateTimeFormat('es-AR', {
    timeZone: AR_TZ,
    weekday: 'long',
  }).format(date);
  const day = Number(
    new Intl.DateTimeFormat('en-CA', { timeZone: AR_TZ, day: 'numeric' }).format(date)
  );
  const month = new Intl.DateTimeFormat('es-AR', {
    timeZone: AR_TZ,
    month: 'long',
  }).format(date);
  const time = new Intl.DateTimeFormat('es-AR', {
    timeZone: AR_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
  return {
    weekday: capitalize(weekday),
    day,
    month,
    time,
  };
}

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function moonCycle(date: Date): number {
  const prevNew = phaseInstantNear(date, 0, 'previous');
  const nextNew = phaseInstantNear(date, 0, 'next');
  const span = nextNew.getTime() - prevNew.getTime();
  if (span <= 0) return 0;
  const age = date.getTime() - prevNew.getTime();
  return ((age / span) % 1 + 1) % 1;
}

function nextPhaseAfter(date: Date, phase: 0 | 0.5): MoonMilestone {
  let instant = phaseInstantNear(date, phase, 'next');
  // Si el instante ya pasó por segundos, saltar al siguiente ciclo
  if (instant.getTime() <= date.getTime() + 60_000) {
    instant = phaseInstantFromK(kForDate(date, phase) + 1, phase);
  }
  return {
    date: instant,
    daysUntil: (instant.getTime() - date.getTime()) / MS_PER_DAY,
  };
}

function getNearestFullMoon(date: Date): MoonMilestone {
  const prev = phaseInstantNear(date, 0.5, 'previous');
  const next = phaseInstantNear(date, 0.5, 'next');
  const usePrev =
    Math.abs(date.getTime() - prev.getTime()) <= Math.abs(next.getTime() - date.getTime());
  const chosen = usePrev ? prev : next;
  return {
    date: chosen,
    daysUntil: (chosen.getTime() - date.getTime()) / MS_PER_DAY,
  };
}

function phaseInstantNear(date: Date, phase: 0 | 0.5, direction: 'previous' | 'next'): Date {
  const base = kForDate(date, phase);
  const candidates = [base - 1, base, base + 1, base + 2, base - 2].map((k) =>
    phaseInstantFromK(k, phase)
  );

  if (direction === 'next') {
    const future = candidates
      .filter((d) => d.getTime() >= date.getTime() - 60_000)
      .sort((a, b) => a.getTime() - b.getTime());
    return future[0] || phaseInstantFromK(base + 3, phase);
  }

  const past = candidates
    .filter((d) => d.getTime() <= date.getTime() + 60_000)
    .sort((a, b) => b.getTime() - a.getTime());
  return past[0] || phaseInstantFromK(base - 3, phase);
}

/** Índice k de Meeus para el año/mes alrededor de `date`. */
function kForDate(date: Date, phase: 0 | 0.5): number {
  const y =
    date.getUTCFullYear() +
    (date.getUTCMonth() + 1) / 12 +
    date.getUTCDate() / 365.25;
  let k = Math.floor((y - 2000) * 12.3685);
  // Ajuste: k entero = nueva; +0.5 = llena
  k = Math.floor(k) + phase;
  return k;
}

/**
 * Instante aproximado de luna nueva (phase=0) o llena (phase=0.5).
 * Meeus, cap. 49 (términos principales).
 */
function phaseInstantFromK(k: number, phase: 0 | 0.5): Date {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;

  // JDE medio
  let jde =
    2451550.09766 +
    29.530588861 * k +
    0.00015437 * T2 -
    0.00000015 * T3 +
    0.00000000073 * T4;

  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  const M = deg2rad(2.5534 + 29.1053567 * k - 0.0000014 * T2 - 0.00000011 * T3);
  const Mp = deg2rad(
    201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4
  );
  const F = deg2rad(
    160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4
  );
  const Om = deg2rad(124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3);

  // Términos periódicos (días). Distintos para nueva vs llena.
  let corr = 0;
  if (phase === 0) {
    corr =
      -0.4072 * Math.sin(Mp) +
      0.17241 * E * Math.sin(M) +
      0.01608 * Math.sin(2 * Mp) +
      0.01039 * Math.sin(2 * F) +
      0.00739 * E * Math.sin(Mp - M) -
      0.00514 * E * Math.sin(Mp + M) +
      0.00208 * E * E * Math.sin(2 * M) -
      0.00111 * Math.sin(Mp - 2 * F) -
      0.00057 * Math.sin(Mp + 2 * F) +
      0.00056 * E * Math.sin(2 * Mp + M) -
      0.00042 * Math.sin(3 * Mp) +
      0.00042 * E * Math.sin(M + 2 * F) +
      0.00038 * E * Math.sin(M - 2 * F) -
      0.00024 * E * Math.sin(2 * Mp - M) -
      0.00017 * Math.sin(Om) -
      0.00007 * Math.sin(Mp + 2 * M);
  } else {
    corr =
      -0.40614 * Math.sin(Mp) +
      0.17302 * E * Math.sin(M) +
      0.01614 * Math.sin(2 * Mp) +
      0.01043 * Math.sin(2 * F) +
      0.00734 * E * Math.sin(Mp - M) -
      0.00515 * E * Math.sin(Mp + M) +
      0.00209 * E * E * Math.sin(2 * M) -
      0.00111 * Math.sin(Mp - 2 * F) -
      0.00057 * Math.sin(Mp + 2 * F) +
      0.00056 * E * Math.sin(2 * Mp + M) -
      0.00042 * Math.sin(3 * Mp) +
      0.00042 * E * Math.sin(M + 2 * F) +
      0.00038 * E * Math.sin(M - 2 * F) -
      0.00024 * E * Math.sin(2 * Mp - M) -
      0.00017 * Math.sin(Om) -
      0.00007 * Math.sin(Mp + 2 * M);
  }

  jde += corr;
  return jdeToDate(jde);
}

function deg2rad(deg: number): number {
  return ((deg % 360) * Math.PI) / 180;
}

/** Julian Ephemeris Day → Date UTC. */
function jdeToDate(jde: number): Date {
  const ms = (jde - 2440587.5) * MS_PER_DAY;
  return new Date(ms);
}

function phaseIdFromCycle(cycle: number): MoonPhaseId {
  const index = Math.floor(((cycle + 1 / 16) % 1) * 8);
  const ids: MoonPhaseId[] = [
    'new',
    'waxing-crescent',
    'first-quarter',
    'waxing-gibbous',
    'full',
    'waning-gibbous',
    'last-quarter',
    'waning-crescent',
  ];
  return ids[index] || 'new';
}

function phaseLabel(id: MoonPhaseId): string {
  switch (id) {
    case 'new':
      return 'Nueva';
    case 'waxing-crescent':
      return 'Creciente';
    case 'first-quarter':
      return 'Cuarto creciente';
    case 'waxing-gibbous':
      return 'Gibosa creciente';
    case 'full':
      return 'Llena';
    case 'waning-gibbous':
      return 'Gibosa menguante';
    case 'last-quarter':
      return 'Cuarto menguante';
    case 'waning-crescent':
      return 'Menguante';
    default:
      return 'Luna';
  }
}

function phaseShortLines(id: MoonPhaseId): [string, string?] {
  switch (id) {
    case 'new':
      return ['Nueva'];
    case 'waxing-crescent':
      return ['Crec.', 'inic.'];
    case 'first-quarter':
      return ['Cuarto', 'crec.'];
    case 'waxing-gibbous':
      return ['Gibosa', 'crec.'];
    case 'full':
      return ['Llena'];
    case 'waning-gibbous':
      return ['Gibosa', 'meng.'];
    case 'last-quarter':
      return ['Cuarto', 'meng.'];
    case 'waning-crescent':
      return ['Meng.', 'final'];
    default:
      return ['Lunar'];
  }
}
