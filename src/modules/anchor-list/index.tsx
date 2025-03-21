"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AnchorList({
  headings,
}: {
  headings: { id: string; text: string }[];
}) {
  const [activeHeading, setActiveHeading] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentHeading = headings.find((heading) => {
        const element = document.getElementById(heading.id);
        return element && element.offsetTop <= window.scrollY + 100;
      });
      setActiveHeading(currentHeading ? currentHeading.id : null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  return (
    <div className="flex-none w-64 p-4">
      <h3 className="mb-4 text-lg font-semibold">目录</h3>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`}>
              <Button variant="link">{heading.text}</Button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
