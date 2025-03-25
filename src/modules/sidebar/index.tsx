"use client";

import { useState, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { Toggle } from "@/components/ui/toggle";

export interface ParentSiderInterface {
  text: string;
  path?: LinkProps["href"];
  children?: ChildSiderInterface[];
}

interface ChildSiderInterface {
  text: string;
  path: LinkProps["href"];
}

export function Sidebar({
  siders,
  slug,
}: {
  siders: ParentSiderInterface[];
  slug: string[];
}) {
  const [collapsibleParentSider, setCollapsibleParentSider] = useState(
    slug?.[1]
  );

  const collapsibleCaller = useCallback((parentSider: string) => {
    setCollapsibleParentSider(parentSider);
  }, []);

  return (
    <Accordion
      type="single"
      collapsible
      className="sticky h-[calc(100vh-48px)] p-4 col-span-1 shadow-[inset_-1px_0_0_0_var(--skeleton-border),inset_1px_0_0_0_var(--skeleton-border)] top-[48px] z-50 transition-all duration-300"
      value={collapsibleParentSider}
      onValueChange={collapsibleCaller}
    >
      {siders?.map(({ text, children }) => {
        return (
          <AccordionItem className="border-none" key={text} value={text}>
            <AccordionTrigger className="p-2 font-semibold">
              {text}
            </AccordionTrigger>
            <AccordionContent className="pl-3 grid gap-1">
              {children?.map(({ text: childText, path }) => (
                <Link key={childText} href={path}>
                  <Toggle
                    variant="underline"
                    className="w-full justify-start p-2 h-7 text-nav-foreground"
                    aria-label="Toggle italic"
                    pressed={slug.includes(childText)}
                  >
                    {childText}
                  </Toggle>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
