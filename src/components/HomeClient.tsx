"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";
import type { Work } from "@/data/works";
import type { RadialThumb } from "@/components/RadialMenu";

type Props = {
  works: Work[];
  thumbs: RadialThumb[];
};

export default function HomeClient({ works, thumbs }: Props) {
  const searchParams = useSearchParams();
  const requestedWorkId = searchParams.get("work");

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filteredWorks = useMemo(() => {
    if (selectedYear === null) return works;
    return works.filter((w) => w.year === selectedYear);
  }, [works, selectedYear]);

  const initialIndex = useMemo(() => {
    if (!requestedWorkId) return 0;

    const idx = filteredWorks.findIndex(
      (w) => w.id === requestedWorkId,
    );

    return idx >= 0 ? idx : 0;
  }, [filteredWorks, requestedWorkId]);

  return (
    <main style={{ position: "relative" }}>
      <Navbar
        works={works}
        thumbs={thumbs}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
      />

      <Gallery
        works={filteredWorks}
        initialIndex={initialIndex}
      />
    </main>
  );
}