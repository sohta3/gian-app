export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>About</h1>
      <picture>
        <img
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/beautiful_gian.jpg"
          alt="beatiful gian"
          width={180}
          height={37}
        />
      </picture>
      <div>やあ、のび太くん</div>
    </main>
  );
}
