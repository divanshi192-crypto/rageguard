"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(15);

    const t1 = setTimeout(() => setProgress(65), 80);
    const t2 = setTimeout(() => setProgress(100), 220);
    const t3 = setTimeout(() => setVisible(false), 500);
    const t4 = setTimeout(() => setProgress(0), 620);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-[2px]">
      <div
        className="h-full bg-[#1D9E75] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
