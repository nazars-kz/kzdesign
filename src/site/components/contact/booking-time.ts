/**
 * Time helpers of the "Book a call" tab. There is no calendar behind it yet, so the
 * availability is a deterministic mock (Mon–Fri, 10:00–17:30 office time, 30-minute slots,
 * about a quarter of them "booked", nothing closer than two hours); times are shown in
 * the visitor's own time zone. Replace `slotsFor` with a real calendar (Cal.com / Google
 * Calendar) when there is one. Client-safe, no imports.
 */

export const OFFICE_TZ = 'Europe/Tallinn';
export const SLOT_MINUTES = 30;
export const WEEKS_AHEAD = 8;
/** Office hours in minutes from midnight (last slot starts 17:30). */
const DAY_START = 10 * 60;
const DAY_END = 18 * 60;
/** A slot closer than this is closed. */
const LEAD_TIME_MS = 2 * 3600_000;

export interface Slot {
  readonly at: Date;
  readonly off: boolean;
}

/** Minutes east of UTC of `tz` at the instant `date`. */
export function tzOffsetMin(date: Date, tz: string): number {
  const parts: Record<string, string> = {};
  new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
    .formatToParts(date)
    .forEach((part) => {
      parts[part.type] = part.value;
    });
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
  );
  return Math.round((asUtc - Math.floor(date.getTime() / 60000) * 60000) / 60000);
}

/** Office wall time (year, month 0-11, day, minutes) → the real instant. */
export function officeInstant(y: number, m: number, d: number, minutes: number): Date {
  const guess = new Date(Date.UTC(y, m, d, 0, minutes));
  return new Date(guess.getTime() - tzOffsetMin(guess, OFFICE_TZ) * 60000);
}

/** Today's date in the office time zone (local midnight of that calendar day). */
export function officeToday(): Date {
  const parts: Record<string, string> = {};
  new Intl.DateTimeFormat('en-US', {
    timeZone: OFFICE_TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
    .formatToParts(new Date())
    .forEach((part) => {
      parts[part.type] = part.value;
    });
  return new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
}

/** Deterministic mock: about 25% of the slots are taken. */
function isBusy(y: number, m: number, d: number, minutes: number): boolean {
  let h = (y * 372 + m * 31 + d) * 97 + minutes;
  h = Math.imul(h ^ (h >>> 7), 0x9e3779b1) >>> 0;
  return (h >>> 13) % 4 === 0;
}

export function slotsFor(day: Date): Slot[] {
  const slots: Slot[] = [];
  const now = Date.now() + LEAD_TIME_MS;
  for (let t = DAY_START; t < DAY_END; t += SLOT_MINUTES) {
    const at = officeInstant(day.getFullYear(), day.getMonth(), day.getDate(), t);
    slots.push({
      at,
      off: at.getTime() < now || isBusy(day.getFullYear(), day.getMonth(), day.getDate(), t),
    });
  }
  return slots;
}

/** Last day that can be booked. */
export function lastBookableDay(today: Date): Date {
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + WEEKS_AHEAD * 7);
}

export function isDayOpen(day: Date, today: Date, last: Date): boolean {
  const weekday = day.getDay();
  if (weekday === 0 || weekday === 6 || day < today || day > last) return false;
  return slotsFor(day).some((slot) => !slot.off);
}

export function firstOpenDay(today: Date, last: Date): Date | null {
  for (let d = new Date(today); d <= last; d.setDate(d.getDate() + 1)) {
    if (isDayOpen(d, today, last)) return new Date(d);
  }
  return null;
}

export function visitorTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || OFFICE_TZ;
}

export function formatTime(date: Date, tz: string, hour24: boolean): string {
  return new Intl.DateTimeFormat(hour24 ? 'en-GB' : 'en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: !hour24,
  })
    .format(date)
    .replace(/^0(\d)(?=:\d\d\s?[AP]M)/, '$1');
}

export function formatDay(date: Date, tz: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone: tz, ...options }).format(date);
}

/** "Kyiv · GMT+2" for the visitor's zone at that instant. */
export function gmtLabel(date: Date, tz: string): string {
  const offset = tzOffsetMin(date, tz);
  const sign = offset < 0 ? '−' : '+';
  const abs = Math.abs(offset);
  const city = tz.split('/').pop()?.replace(/_/g, ' ') ?? tz;
  const minutes = abs % 60 ? `:${String(abs % 60).padStart(2, '0')}` : '';
  return `${city} · GMT${sign}${Math.floor(abs / 60)}${minutes}`;
}
