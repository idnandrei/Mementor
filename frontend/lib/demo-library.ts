export type Lecture = {
  id: string;
  title: string;
  course: string;
  collection: "machine-learning" | "deep-learning" | "statistics";
  duration: string;
  added: string;
  questions: number;
  accent: string;
  episode: string;
};

export const lectures: Lecture[] = [
  {
    id: "linear-algebra",
    title: "Introduction to Linear Algebra",
    course: "Machine Learning",
    collection: "machine-learning",
    duration: "47 min",
    added: "Jul 27, 2026",
    questions: 8,
    accent: "from-cyan-950 via-cyan-700 to-sky-400",
    episode: "01",
  },
  {
    id: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    course: "Deep Learning",
    collection: "deep-learning",
    duration: "1h 12m",
    added: "Jul 24, 2026",
    questions: 14,
    accent: "from-violet-950 via-violet-700 to-fuchsia-400",
    episode: "04",
  },
  {
    id: "market-equilibrium",
    title: "Microeconomics: Market Equilibrium",
    course: "Statistics",
    collection: "statistics",
    duration: "52 min",
    added: "Jul 18, 2026",
    questions: 5,
    accent: "from-amber-950 via-orange-700 to-amber-400",
    episode: "07",
  },
  {
    id: "gradient-descent",
    title: "Gradient Descent & Optimization",
    course: "Machine Learning",
    collection: "machine-learning",
    duration: "1h 24m",
    added: "Jul 14, 2026",
    questions: 11,
    accent: "from-slate-950 via-teal-800 to-emerald-400",
    episode: "06",
  },
  {
    id: "backpropagation",
    title: "Neural Networks: Backpropagation",
    course: "Deep Learning",
    collection: "deep-learning",
    duration: "58 min",
    added: "Jul 09, 2026",
    questions: 9,
    accent: "from-indigo-950 via-blue-800 to-cyan-400",
    episode: "03",
  },
  {
    id: "probability-distributions",
    title: "Probability Distributions",
    course: "Statistics",
    collection: "statistics",
    duration: "1h 08m",
    added: "Jul 02, 2026",
    questions: 12,
    accent: "from-rose-950 via-rose-700 to-orange-300",
    episode: "09",
  },
];

export const collections = [
  { slug: "machine-learning", label: "Machine Learning", color: "bg-cyan-500" },
  { slug: "deep-learning", label: "Deep Learning", color: "bg-violet-500" },
  { slug: "statistics", label: "Statistics", color: "bg-amber-500" },
] as const;
