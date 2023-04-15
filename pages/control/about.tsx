import Image from "next/image";
import gianJpg from "./gian.jpg";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>About</h1>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src={gianJpg}
        alt="gian"
        width={180}
        height={37}
        priority
      />
      <div>おれはジャイアン</div>
    </main>
  );
}
