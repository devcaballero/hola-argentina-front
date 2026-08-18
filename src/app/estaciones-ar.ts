/**
 * Estaciones astronómicas para el hemisferio sur (Argentina).
 * Equinoccios/solsticios: aproximación de Meeus (Astronomical Algorithms, cap. 27).
 * Día civil en America/Argentina/Buenos_Aires (HOA).
 */

import { arDateKey } from './moon-phase';

export type EstacionId = 'otono' | 'invierno' | 'primavera' | 'verano';

export interface EstacionEvento {
  id: EstacionId;
  name: string;
  /** Instante del equinoccio/solsticio */
  at: Date;
  /** YYYY-MM-DD en calendario AR */
  dateKey: string;
}

export interface NextEstacionInfo {
  season: EstacionEvento;
  /** Días calendario hasta el inicio (0 = hoy) */
  daysUntil: number;
  isToday: boolean;
}

const MS_PER_DAY = 86400000;
const AR_TZ = 'America/Argentina/Buenos_Aires';

const EVENT_TO_SEASON: EstacionId[] = ['otono', 'invierno', 'primavera', 'verano'];

const SEASON_NAME: Record<EstacionId, string> = {
  otono: 'Otoño',
  invierno: 'Invierno',
  primavera: 'Primavera',
  verano: 'Verano',
};

/** Índice 0=marzo, 1=junio, 2=septiembre, 3=diciembre → estación HS que comienza. */
export function getNextEstacion(date: Date = new Date()): NextEstacionInfo {
  return getUpcomingEstaciones(date, 1)[0];
}

export function getUpcomingEstaciones(date: Date = new Date(), limit = 4): NextEstacionInfo[] {
  const todayKey = arDateKey(date);
  const year = Number(todayKey.slice(0, 4));
  const events = [
    ...seasonEventsForYear(year - 1),
    ...seasonEventsForYear(year),
    ...seasonEventsForYear(year + 1),
  ].sort((a, b) => a.at.getTime() - b.at.getTime());

  const out: NextEstacionInfo[] = [];
  for (const season of events) {
    if (season.dateKey < todayKey) continue;
    const daysUntil = calendarDaysUntil(todayKey, season.dateKey);
    out.push({
      season,
      daysUntil,
      isToday: daysUntil === 0,
    });
    if (out.length >= limit) break;
  }
  return out;
}

/** Estación en curso (la última cuyo día de inicio ya pasó o es hoy). */
export function getCurrentEstacion(date: Date = new Date()): EstacionEvento {
  const todayKey = arDateKey(date);
  const year = Number(todayKey.slice(0, 4));
  const events = [
    ...seasonEventsForYear(year - 1),
    ...seasonEventsForYear(year),
  ].sort((a, b) => a.at.getTime() - b.at.getTime());

  let current = events[0];
  for (const ev of events) {
    if (ev.dateKey <= todayKey) current = ev;
    else break;
  }
  return current;
}

export function formatEstacionDate(dateKey: string): string {
  const d = parseArNoon(dateKey);
  const weekday = new Intl.DateTimeFormat('es-AR', {
    timeZone: AR_TZ,
    weekday: 'long',
  }).format(d);
  const day = Number(
    new Intl.DateTimeFormat('en-CA', { timeZone: AR_TZ, day: 'numeric' }).format(d)
  );
  const month = new Intl.DateTimeFormat('es-AR', {
    timeZone: AR_TZ,
    month: 'long',
  }).format(d);
  return `${weekday} ${day} de ${month}`;
}

export function formatEstacionDateTime(at: Date): string {
  const { weekday, day, month, time } = formatParts(at);
  return `${weekday} ${day} de ${month} · ${time}`;
}

export function countdownShortLabel(daysUntil: number): string {
  if (daysUntil <= 0) return 'HOY';
  if (daysUntil === 1) return '1d';
  return `${daysUntil}d`;
}

export function countdownLongLabel(daysUntil: number): string {
  if (daysUntil <= 0) return 'Hoy';
  if (daysUntil === 1) return 'Mañana';
  return `En ${daysUntil} días`;
}

export function seasonName(id: EstacionId): string {
  return SEASON_NAME[id];
}

function seasonEventsForYear(year: number): EstacionEvento[] {
  return [0, 1, 2, 3].map((i) => {
    const at = meeusEquinoxSolstice(year, i);
    const id = EVENT_TO_SEASON[i];
    return {
      id,
      name: SEASON_NAME[id],
      at,
      dateKey: arDateKey(at),
    };
  });
}

/**
 * Meeus mean equinox/solstice → Date (UTC instant).
 * event: 0=marzo, 1=junio, 2=septiembre, 3=diciembre.
 */
function meeusEquinoxSolstice(year: number, event: number): Date {
  const Y = (year - 2000) / 1000;
  let jde: number;
  switch (event) {
    case 0:
      jde = 2451623.80984 + 365242.37404 * Y + 0.05169 * Y * Y - 0.00411 * Y * Y * Y - 0.00057 * Y * Y * Y * Y;
      break;
    case 1:
      jde = 2451716.56767 + 365241.62603 * Y + 0.00325 * Y * Y + 0.00888 * Y * Y * Y - 0.0003 * Y * Y * Y * Y;
      break;
    case 2:
      jde = 2451810.21715 + 365242.01767 * Y - 0.11575 * Y * Y + 0.00337 * Y * Y * Y + 0.00078 * Y * Y * Y * Y;
      break;
    default:
      jde = 2451900.05952 + 365242.74049 * Y - 0.06223 * Y * Y - 0.00823 * Y * Y * Y + 0.00032 * Y * Y * Y * Y;
      break;
  }
  // Correcciones periódicas (orden bajo) para acercar a efemérides (~minutos).
  jde += meeusPeriodicTerms(jde, event);
  return julianToDate(jde);
}

function meeusPeriodicTerms(jde: number, event: number): number {
  const T = (jde - 2451545.0) / 36525;
  const A = [
    485 * Math.cos(deg2rad(324.96 + 1934.136 * T)),
    203 * Math.cos(deg2rad(337.23 + 32964.467 * T)),
    199 * Math.cos(deg2rad(342.08 + 20.186 * T)),
    182 * Math.cos(deg2rad(27.85 + 445267.112 * T)),
    156 * Math.cos(deg2rad(73.14 + 45036.886 * T)),
    136 * Math.cos(deg2rad(171.52 + 22518.443 * T)),
    77 * Math.cos(deg2rad(222.54 + 65928.934 * T)),
    74 * Math.cos(deg2rad(296.72 + 3034.906 * T)),
    70 * Math.cos(deg2rad(243.58 + 9037.513 * T)),
    58 * Math.cos(deg2rad(119.81 + 33718.147 * T)),
    52 * Math.cos(deg2rad(297.17 + 150.678 * T)),
    50 * Math.cos(deg2rad(21.02 + 2281.226 * T)),
  ];
  const S = A.reduce((sum, v) => sum + v, 0);
  // Factor depende levemente del evento; 10^-5 días ≈ 0.86 s por unidad de S.
  return (S * 0.00001) * (event === 2 || event === 0 ? 1 : 1);
}

function julianToDate(jde: number): Date {
  // JD → Unix ms (JD 2440587.5 = 1970-01-01T00:00:00Z)
  return new Date((jde - 2440587.5) * MS_PER_DAY);
}

function deg2rad(d: number): number {
  return (d * Math.PI) / 180;
}

function calendarDaysUntil(fromKey: string, toKey: string): number {
  const a = parseArNoon(fromKey).getTime();
  const b = parseArNoon(toKey).getTime();
  return Math.round((b - a) / MS_PER_DAY);
}

function parseArNoon(dateKey: string): Date {
  return new Date(`${dateKey}T12:00:00-03:00`);
}

function formatParts(date: Date): { weekday: string; day: number; month: string; time: string } {
  const weekday = new Intl.DateTimeFormat('es-AR', { timeZone: AR_TZ, weekday: 'long' }).format(date);
  const day = Number(new Intl.DateTimeFormat('en-CA', { timeZone: AR_TZ, day: 'numeric' }).format(date));
  const month = new Intl.DateTimeFormat('es-AR', { timeZone: AR_TZ, month: 'long' }).format(date);
  const time = new Intl.DateTimeFormat('es-AR', {
    timeZone: AR_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
  return { weekday, day, month, time };
}

// Keep season id order documented for hemisferio sur.
export const ESTACIONES_HS: EstacionId[] = ['otono', 'invierno', 'primavera', 'verano'];
