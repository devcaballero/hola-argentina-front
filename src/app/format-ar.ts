/**
 * Formatea números al estilo argentino.
 * Enteros (p.ej. 1465,00) → `1465`; con centavos → `1465,50`.
 */
export function formatArDecimal(value: string | number | null | undefined, digits = 2): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const raw = String(value).trim().replace(/^\$/, '').replace(/\s/g, '');
  // Si ya viene con coma decimal argentina y sin punto miles ambiguo, respetar
  const normalized = raw.includes(',') && !raw.includes('.')
    ? raw.replace(',', '.')
    : raw.replace(/\./g, (match, offset, full) => (offset === full.lastIndexOf('.') ? '.' : ''));

  const n = Number(normalized);
  if (!Number.isFinite(n)) {
    return String(value);
  }

  const fixed = n.toFixed(digits);
  const asNumber = Number(fixed);
  if (Number.isInteger(asNumber)) {
    return String(asNumber);
  }

  return fixed.replace('.', ',');
}
