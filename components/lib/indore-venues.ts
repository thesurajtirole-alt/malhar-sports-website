// Sourced from public web search (Google/Wikipedia/directory listings), Aug 2026.
// VERIFY contact details, fees, and current status before publishing —
// third-party listings go stale. Addresses/phone numbers here are
// best-effort and may need correction from the actual academy.

export interface IndoreVenue {
  name: string;
  sport: string[];
  type: "Academy" | "Ground/Stadium";
  area: string;
  note: string;
}

export const indoreVenues: IndoreVenue[] = [
  {
    name: "Nehru Stadium",
    sport: ["Cricket", "Football", "Basketball", "Kho Kho"],
    type: "Ground/Stadium",
    area: "Indore",
    note: "Multi-purpose stadium built in 1964, ~25,000 capacity. Hosted international ODIs.",
  },
  {
    name: "Holkar Cricket Stadium",
    sport: ["Cricket"],
    type: "Ground/Stadium",
    area: "Race Course Road",
    note: "Indore's main international cricket venue — hosts national and international matches.",
  },
  {
    name: "Abhay Prashal Indoor Stadium",
    sport: ["Badminton", "Basketball", "Indoor sports"],
    type: "Ground/Stadium",
    area: "Indore",
    note: "Major indoor stadium used for badminton, basketball, and other indoor events.",
  },
  {
    name: "Indore Cricket Club (ICC)",
    sport: ["Cricket"],
    type: "Academy",
    area: "Saket Nagar",
    note: "Runs structured coaching for U-10 to seniors, with a maintained practice ground.",
  },
  {
    name: "Madhya Pradesh Cricket Association (MPCA) Academy",
    sport: ["Cricket"],
    type: "Academy",
    area: "Indore",
    note: "State cricket association's academy — batting, bowling, and fielding coaching.",
  },
  {
    name: "Indore Badminton Academy",
    sport: ["Badminton"],
    type: "Academy",
    area: "Indore",
    note: "Established badminton coaching academy serving Indore and central MP.",
  },
];
