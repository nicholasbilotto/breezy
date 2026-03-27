import Link from "next/link";

export default function ObservationsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Observations</h1>
      <p className="mt-4 text-zinc-700 dark:text-zinc-300">
        Replace this placeholder with your observational photography work and
        descriptions.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block text-sm tracking-[0.24em] uppercase text-zinc-700 hover:opacity-80 dark:text-zinc-200"
      >
        Back to Home
      </Link>
    </div>
  );
}

