import HomeClient from "@/components/HomeClient";
import { loadWorks } from "@/lib/loadWorks";
import type { RadialThumb } from "@/components/RadialMenu";

export const dynamic = "force-static";

function shuffle<T>(arr: T[]) {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export default function HomePage() {
  const works = loadWorks();

  const thumbs: RadialThumb[] = shuffle(
    works.filter((w) => w.image),
  )
    .slice(0, 8)
    .map((w) => ({
      id: w.id,
      image: w.image,
      title: w.title,
      href: `/?work=${encodeURIComponent(w.id)}`,
    }));

  return <HomeClient works={works} thumbs={thumbs} />;
}