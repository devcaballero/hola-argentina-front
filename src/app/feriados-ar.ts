/**
 * Feriados nacionales y días no laborables con fines turísticos (AR).
 * Fuentes: Ley 27.399, Resolución 164/2025 (turísticos 2026), BCRA C 101352.
 * Los puentes 2027 se agregan cuando salga el decreto.
 */

import { arDateKey } from './moon-phase';

export type FeriadoTipo = 'inamovible' | 'trasladable' | 'turistico';

export interface Feriado {
  /** YYYY-MM-DD (calendario civil AR) */
  date: string;
  name: string;
  tipo: FeriadoTipo;
}

export interface NextFeriadoInfo {
  feriado: Feriado;
  /** Días calendario hasta el feriado (0 = hoy) */
  daysUntil: number;
  isToday: boolean;
}

const MS_PER_DAY = 86400000;

/** Calendario precargado; actualizar al publicar el BO del año siguiente. */
const FERIADOS: Feriado[] = [
  // —— 2026 ——
  { date: '2026-01-01', name: 'Año Nuevo', tipo: 'inamovible' },
  { date: '2026-02-16', name: 'Carnaval', tipo: 'inamovible' },
  { date: '2026-02-17', name: 'Carnaval', tipo: 'inamovible' },
  { date: '2026-03-23', name: 'Día no laborable con fines turísticos', tipo: 'turistico' },
  { date: '2026-03-24', name: 'Día Nacional de la Memoria por la Verdad y la Justicia', tipo: 'inamovible' },
  { date: '2026-04-02', name: 'Día del Veterano y de los Caídos en la Guerra de Malvinas', tipo: 'inamovible' },
  { date: '2026-04-03', name: 'Viernes Santo', tipo: 'inamovible' },
  { date: '2026-05-01', name: 'Día del Trabajador', tipo: 'inamovible' },
  { date: '2026-05-25', name: 'Día de la Revolución de Mayo', tipo: 'inamovible' },
  { date: '2026-06-15', name: 'Paso a la Inmortalidad del Gral. Martín Miguel de Güemes', tipo: 'trasladable' },
  { date: '2026-06-20', name: 'Paso a la Inmortalidad del Gral. Manuel Belgrano', tipo: 'inamovible' },
  { date: '2026-07-09', name: 'Día de la Independencia', tipo: 'inamovible' },
  { date: '2026-07-10', name: 'Día no laborable con fines turísticos', tipo: 'turistico' },
  { date: '2026-08-17', name: 'Paso a la Inmortalidad del Gral. José de San Martín', tipo: 'trasladable' },
  { date: '2026-10-12', name: 'Día del Respeto a la Diversidad Cultural', tipo: 'trasladable' },
  { date: '2026-11-23', name: 'Día de la Soberanía Nacional', tipo: 'trasladable' },
  { date: '2026-12-07', name: 'Día no laborable con fines turísticos', tipo: 'turistico' },
  { date: '2026-12-08', name: 'Inmaculada Concepción de María', tipo: 'inamovible' },
  { date: '2026-12-25', name: 'Navidad', tipo: 'inamovible' },

  // —— 2027 (sin puentes turísticos: aún no decretados) ——
  { date: '2027-01-01', name: 'Año Nuevo', tipo: 'inamovible' },
  { date: '2027-02-08', name: 'Carnaval', tipo: 'inamovible' },
  { date: '2027-02-09', name: 'Carnaval', tipo: 'inamovible' },
  { date: '2027-03-24', name: 'Día Nacional de la Memoria por la Verdad y la Justicia', tipo: 'inamovible' },
  { date: '2027-03-26', name: 'Viernes Santo', tipo: 'inamovible' },
  { date: '2027-04-02', name: 'Día del Veterano y de los Caídos en la Guerra de Malvinas', tipo: 'inamovible' },
  { date: '2027-05-01', name: 'Día del Trabajador', tipo: 'inamovible' },
  { date: '2027-05-25', name: 'Día de la Revolución de Mayo', tipo: 'inamovible' },
  { date: '2027-06-20', name: 'Paso a la Inmortalidad del Gral. Manuel Belgrano', tipo: 'inamovible' },
  { date: '2027-06-21', name: 'Paso a la Inmortalidad del Gral. Martín Miguel de Güemes', tipo: 'trasladable' },
  { date: '2027-07-09', name: 'Día de la Independencia', tipo: 'inamovible' },
  { date: '2027-08-16', name: 'Paso a la Inmortalidad del Gral. José de San Martín', tipo: 'trasladable' },
  { date: '2027-10-11', name: 'Día del Respeto a la Diversidad Cultural', tipo: 'trasladable' },
  { date: '2027-11-20', name: 'Día de la Soberanía Nacional', tipo: 'trasladable' },
  { date: '2027-12-08', name: 'Inmaculada Concepción de María', tipo: 'inamovible' },
  { date: '2027-12-25', name: 'Navidad', tipo: 'inamovible' },
];

export function getNextFeriado(date: Date = new Date()): NextFeriadoInfo | null {
  const upcoming = getUpcomingFeriados(date, 1);
  return upcoming[0] ?? null;
}

export function getUpcomingFeriados(date: Date = new Date(), limit = 5): NextFeriadoInfo[] {
  const todayKey = arDateKey(date);
  const out: NextFeriadoInfo[] = [];
  for (const feriado of FERIADOS) {
    if (feriado.date < todayKey) continue;
    const daysUntil = calendarDaysUntil(todayKey, feriado.date);
    out.push({
      feriado,
      daysUntil,
      isToday: daysUntil === 0,
    });
    if (out.length >= limit) break;
  }
  return out;
}

export function tipoLabel(tipo: FeriadoTipo): string {
  switch (tipo) {
    case 'inamovible':
      return 'Feriado inamovible';
    case 'trasladable':
      return 'Feriado trasladable';
    case 'turistico':
      return 'No laborable turístico';
  }
}

export function formatFeriadoDate(dateKey: string): string {
  const d = parseArNoon(dateKey);
  const weekday = new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    weekday: 'long',
  }).format(d);
  const day = Number(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires',
      day: 'numeric',
    }).format(d)
  );
  const month = new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    month: 'long',
  }).format(d);
  return `${weekday} ${day} de ${month}`;
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

function calendarDaysUntil(fromKey: string, toKey: string): number {
  const a = parseArNoon(fromKey).getTime();
  const b = parseArNoon(toKey).getTime();
  return Math.round((b - a) / MS_PER_DAY);
}

function parseArNoon(dateKey: string): Date {
  return new Date(`${dateKey}T12:00:00-03:00`);
}
