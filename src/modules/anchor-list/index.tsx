"use client";

import { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import type { IHeadingInterfase } from "@/types/mdx";

export default function AnchorList({
  headings = [],
}: {
  headings?: Array<IHeadingInterfase>;
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
    <ul className="grid grid-cols-1 gap-2">
      {headings?.map((heading) => (
        <li key={heading.id} className="col-span-1">
          <a href={`#${heading.id}`}>
            <Toggle
              className="h-auto text-nav-foreground"
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
