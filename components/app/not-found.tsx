import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl">🏏💨</span>
      <h1 className="mt-6 font-display text-3xl md:text-4xl">
        Lagta Hai Ball Boundary Ke Bahar Chali Gayi 😅
      </h1>
      <p className="mt-3 text-ink/70">
        Ye page nahi mila. Chalo, wapas ground pe le chalte hai.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-pill bg-orange px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
      >
        Home Pe Wapas Jao
      </Link>
    </div>
  );
}
