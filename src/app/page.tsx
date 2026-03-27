import HomeStack from "@/components/HomeStack";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-foreground">
      <main className="mx-auto w-full max-w-7xl px-6 pt-14 pb-16">
        <HomeStack />
      </main>
    </div>
  );
}
