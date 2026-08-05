export type SportKey =
  | "cricket"
  | "football"
  | "badminton"
  | "running"
  | "gym"
  | "school";

export interface SportMood {
  key: SportKey;
  label: string;
  emoji: string;
  lineForYou: string; // shown when this sport is selected
  chips: string[]; // quick category chips shown under hero for this sport
}

export const sportMoods: SportMood[] = [
  {
    key: "cricket",
    label: "Cricket",
    emoji: "🏏",
    lineForYou:
      "Toh bhai, bat pakdo — sahi bat, sahi grip, sahi advice, sab yaha milega.",
    chips: ["Bats", "Kit Bags", "Cricket Shoes", "Protective Gear"],
  },
  {
    key: "football",
    label: "Football",
    emoji: "⚽",
    lineForYou:
      "Studs tight, ball round, aur galiyon se stadium tak — chalo shuru karte hai.",
    chips: ["Football Shoes", "Studs Guide", "Jerseys", "Shin Guards"],
  },
  {
    key: "badminton",
    label: "Badminton",
    emoji: "🏸",
    lineForYou:
      "Smash maarne se pehle, sahi racket ka weight pata hona chahiye.",
    chips: ["Rackets", "Shuttlecocks", "Court Shoes", "Grip Guide"],
  },
  {
    key: "running",
    label: "Running",
    emoji: "🏃",
    lineForYou:
      "Running ke liye perfect shoes dhundho — pronation se pace tak, sab cover.",
    chips: ["Running Shoes", "Gait Guide", "Socks", "5K Training"],
  },
  {
    key: "gym",
    label: "Gym",
    emoji: "🏋️",
    lineForYou: "Gains ke liye gear bhi sahi hona chahiye — chalo dekhte hai.",
    chips: ["Gym Shoes", "Gloves", "Shakers", "Resistance Bands"],
  },
  {
    key: "school",
    label: "School Sports",
    emoji: "🎒",
    lineForYou:
      "Annual sports day ho ya PT period — bachchon ka kit yaha ready hoga.",
    chips: ["PT Shoes", "House Kits", "Sports Day Gear", "Bulk Orders"],
  },
];
