import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>

      <div className="mt-6 space-y-4 text-zinc-700 dark:text-zinc-300">
        <p>
          Replace this paragraph with a short bio (what you shoot, what you
          enjoy, and how you work).
        </p>
        <p>
          <span className="font-medium tracking-wide text-zinc-900 dark:text-zinc-100">
            Email
          </span>
          :{" "}
          <a
            className="underline underline-offset-2 hover:opacity-80"
            href="mailto:hello@example.com"
          >
            hello@example.com
          </a>
        </p>
        <p>
          <span className="font-medium tracking-wide text-zinc-900 dark:text-zinc-100">
            Instagram
          </span>
          :{" "}
          <a
            className="underline underline-offset-2 hover:opacity-80"
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @yourhandle
          </a>
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-sm tracking-[0.24em] uppercase text-zinc-700 hover:opacity-80 dark:text-zinc-200"
      >
        Back to Home
      </Link>
    </div>
  );
}

