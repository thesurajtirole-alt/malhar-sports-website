export interface TimeSlot {
  startTime: string; // "HH:MM"
  endTime: string;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Generates fixed-length slots between opening and closing time. */
export function generateSlots(
  openingTime: string,
  closingTime: string,
  durationMinutes: number
): TimeSlot[] {
  const start = toMinutes(openingTime);
  const end = toMinutes(closingTime);
  const slots: TimeSlot[] = [];

  for (let t = start; t + durationMinutes <= end; t += durationMinutes) {
    slots.push({ startTime: toHHMM(t), endTime: toHHMM(t + durationMinutes) });
  }

  return slots;
}
