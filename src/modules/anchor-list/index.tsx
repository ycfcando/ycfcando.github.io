"use client";

import { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import type { HeadingInterfase } from "@/types/remark-plugins";

export default function AnchorList({
  headings = [],
}: {
  headings: HeadingInterfase[];
}) {
  const [activeHeading, setActiveHeading] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <ul>
      {headings.map((heading) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`}>
            <Toggle
              variant="blod"
              pressed={activeHeading === heading.id}
              onClick={() => setActiveHeading(heading.id)}
            >
              {heading.text}
            </Toggle>
          </a>
        </li>
      ))}
    </ul>
  );
}
