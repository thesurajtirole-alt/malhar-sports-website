// All daily content picks deterministically from the current date, so
// "today's" challenge is the same for every visitor without a backend.

export function dayIndex(length: number): number {
  const start = new Date(2026, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const daysSince = Math.floor((today - start) / 86400000);
  return ((daysSince % length) + length) % length;
}

export interface GuessThePlayer {
  clue1: string;
  clue2: string;
  clue3: string;
  answer: string;
  sport: string;
}

export const guessThePlayerPool: GuessThePlayer[] = [
  {
    clue1: "Isne international cricket mein sabse zyada runs banaye hai.",
    clue2: "Mumbai se hai, aur 100 international centuries ka record iske naam hai.",
    clue3: "Fans use pyaar se 'Cricket Ka Bhagwan' bulate hai.",
    answer: "Sachin Tendulkar",
    sport: "Cricket",
  },
  {
    clue1: "Ye badminton player Indian hai aur Olympic medal jeet chuka/chuki hai.",
    clue2: "World No. 1 bhi raha/rahi hai apne career mein.",
    clue3: "Smash iska signature shot hai.",
    answer: "P.V. Sindhu",
    sport: "Badminton",
  },
  {
    clue1: "Ye football legend apne free-kicks ke liye jaana jaata hai.",
    clue2: "Portugal ke liye khelta hai.",
    clue3: "'Siuuu' celebration famous hai.",
    answer: "Cristiano Ronaldo",
    sport: "Football",
  },
  {
    clue1: "Indian cricket captain jo calm demeanor ke liye jaana jaata hai.",
    clue2: "Test cricket mein Indian team ko No. 1 tak le gaya.",
    clue3: "MS ke baad captaincy li thi.",
    answer: "Virat Kohli",
    sport: "Cricket",
  },
  {
    clue1: "Ye sprinter duniya ka sabse fast insaan raha hai.",
    clue2: "Jamaica se hai.",
    clue3: "100m record uske naam hai — 9.58 seconds.",
    answer: "Usain Bolt",
    sport: "Athletics",
  },
];

export interface SportsFact {
  fact: string;
  sport: string;
}

export const sportsFactPool: SportsFact[] = [
  {
    fact: "Badminton ka shuttlecock 10,000 RPM tak ki speed se travel kar sakta hai — kisi bhi racket sport ke object se fastest.",
    sport: "Badminton",
  },
  {
    fact: "Cricket ball ka weight rule ke hisaab se 155.9g se 163g ke beech hona chahiye — thoda bhi zyada ya kam nahi.",
    sport: "Cricket",
  },
  {
    fact: "Football match mein average player 8-13 km tak daudta hai — ek half marathon se bhi zyada!",
    sport: "Football",
  },
  {
    fact: "Running shoes ka sole design pichle 50 saal mein dozens baar badla hai — sirf better cushioning ke liye.",
    sport: "Running",
  },
  {
    fact: "Olympics mein badminton sirf 1992 se shamil hui hai — cricket se bhi baad mein add hui thi ye sport.",
    sport: "Badminton",
  },
];

export interface DailyChallengeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const dailyChallengePool: DailyChallengeQuestion[] = [
  {
    question: "Cricket mein 'Duck' ka matlab kya hota hai?",
    options: [
      "Bina run banaye out hona",
      "6 wickets lena",
      "Century banana",
      "Umpire ka signal",
    ],
    correctIndex: 0,
  },
  {
    question: "Badminton court kitna lamba hota hai (doubles)?",
    options: ["10 meter", "13.4 meter", "20 meter", "15 meter"],
    correctIndex: 1,
  },
  {
    question: "Football match mein normal time kitna hota hai?",
    options: ["60 minutes", "80 minutes", "90 minutes", "100 minutes"],
    correctIndex: 2,
  },
  {
    question: "Marathon ki official distance kitni hoti hai?",
    options: ["21.1 km", "42.2 km", "50 km", "35 km"],
    correctIndex: 1,
  },
  {
    question: "Kabaddi team mein kitne players ground pe hote hai?",
    options: ["5", "7", "9", "11"],
    correctIndex: 1,
  },
];
