"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ArticleIndex = () => {
  const [headings, setHeadings] = useState<
    { text: string; id: string; level: string }[]
  >([]);

  useEffect(() => {
    const articleElement = document.getElementById("mdx");
    if (!articleElement) return;

    const extractedHeadings = Array.from(
      articleElement.querySelectorAll("h2, h3")
    ).map((heading) => ({
      text: heading.textContent || "",
      id: heading.id || "",
      level: heading.nodeName, // 'H2' or 'H3'
    }));

    setHeadings(extractedHeadings);
  }, []);

  return (
    <div className="sticky p-4 top-[48px] z-50 h-[calc(100vh-48px)] transition-all duration-300 col-span-1">
      <ul className="top-0 right-0">
        {headings.map(({ text, id, level }) => (
          <li key={id} className={`my-2 ${level === "H3" ? "ml-4" : ""}`}>
            <a href={`#${id}`}>
              <Button variant="link">{text}</Button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleIndex;
