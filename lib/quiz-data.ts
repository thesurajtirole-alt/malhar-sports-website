import type { BadgeKey } from "./gamification";

export interface QuizOption {
  text: string;
  points: Partial<Record<PersonalityKey, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export type PersonalityKey =
  | "weekend-warrior"
  | "daily-grinder"
  | "school-star"
  | "fitness-first";

export interface PersonalityResult {
  key: PersonalityKey;
  title: string;
  emoji: string;
  description: string;
  badge: BadgeKey;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "frequency",
    question: "Sport khelta/kheleti kitni baar hai?",
    options: [
      {
        text: "Bas weekend pe, mood aaye toh",
        points: { "weekend-warrior": 2 },
      },
      { text: "Roz — bina miss kiye", points: { "daily-grinder": 2 } },
      { text: "School/college ke time table ke hisaab se", points: { "school-star": 2 } },
      { text: "Jab bhi gym jaana ho", points: { "fitness-first": 2 } },
    ],
  },
  {
    id: "goal",
    question: "Sport khelne ka sabse bada reason kya hai?",
    options: [
      { text: "Dosto ke saath maza aata hai", points: { "weekend-warrior": 2 } },
      { text: "Competitive rehna hai, level up karna hai", points: { "daily-grinder": 2 } },
      { text: "School/college team ke liye", points: { "school-star": 2 } },
      { text: "Fit rehna, weight manage karna", points: { "fitness-first": 2 } },
    ],
  },
  {
    id: "gear",
    question: "Naya sports gear kab kharidta/kharidti hai?",
    options: [
      { text: "Jab purana bilkul toot jaaye", points: { "weekend-warrior": 2 } },
      { text: "Performance improve karne ke liye, regularly research karke", points: { "daily-grinder": 2 } },
      { text: "Jab sports day ya tournament aata hai", points: { "school-star": 2 } },
      { text: "Jab naya fitness goal set karta/karti hoon", points: { "fitness-first": 2 } },
    ],
  },
  {
    id: "vibe",
    question: "Match/session ke baad kaisa feel hota hai?",
    options: [
      { text: "Chill, ek achha Sunday tha", points: { "weekend-warrior": 2 } },
      { text: "Already next practice plan kar raha/rahi hoon", points: { "daily-grinder": 2 } },
      { text: "Proud — team/school ke liye khela", points: { "school-star": 2 } },
      { text: "Sweaty but satisfied", points: { "fitness-first": 2 } },
    ],
  },
];

export const personalityResults: Record<PersonalityKey, PersonalityResult> = {
  "weekend-warrior": {
    key: "weekend-warrior",
    title: "Weekend Warrior",
    emoji: "🎯",
    description:
      "Hafte ke 5 din grind, 2 din ground pe full masti. Tera sport calendar Saturday-Sunday ke around ghoomta hai — aur usme kuch galat nahi hai.",
    badge: "weekend-warrior",
  },
  "daily-grinder": {
    key: "daily-grinder",
    title: "Daily Grinder",
    emoji: "🔥",
    description:
      "Tu roz practice karta/karti hai, chahe mood ho ya na ho. Consistency tera superpower hai — coaches isi type ko pasand karte hai.",
    badge: "sports-guru",
  },
  "school-star": {
    key: "school-star",
    title: "School Sports Star",
    emoji: "🎒",
    description:
      "Annual sports day tera Diwali hai. House team, PT period, tournament season — sab mein full energy se involved rehta/rehti hai.",
    badge: "explorer",
  },
  "fitness-first": {
    key: "fitness-first",
    title: "Fitness First",
    emoji: "🏋️",
    description:
      "Sport tere liye ek tool hai fit rehne ka. Gym, running, ya koi bhi activity — goal hamesha better health hota hai.",
    badge: "runner",
  },
};

export function calculateResult(
  scores: Partial<Record<PersonalityKey, number>>
): PersonalityResult {
  let topKey: PersonalityKey = "weekend-warrior";
  let topScore = -1;
  for (const key of Object.keys(scores) as PersonalityKey[]) {
    const score = scores[key] ?? 0;
    if (score > topScore) {
      topScore = score;
      topKey = key;
    }
  }
  return personalityResults[topKey];
}
