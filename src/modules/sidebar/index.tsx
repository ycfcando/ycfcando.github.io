"use client";

import { useState, useCallback, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { RouteContext } from "@/components/provider/route-provider";
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

export function Sidebar({ slug }: { slug: string[] }) {
  const pathname = decodeURIComponent(usePathname());
  const rootRoute = pathname?.match(/^\/[\w\.]+/)?.[0] ?? "undefined";
  const routesData = useContext(RouteContext);
  const siders = useMemo(() => {
    const siderRoutes = routesData.filter(
      (data) => data.level === 2 && data.route.includes(rootRoute)
    );

    return siderRoutes.map(({ name, route, level, ...other }) => {
      const children = routesData.filter(
        (data) => data.level === 3 && data.route.includes(route)
      );

      return {
        name,
        route,
        level,
        ...other,
        children,
      };
    });
  }, [routesData, rootRoute]);

  const [collapsibleParentSider, setCollapsibleParentSider] = useState(
    slug?.[1]
  );
  console.log(pathname);
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
      {siders?.map(({ name, path, slug: siderSlug, children }) => {
        return (
          <AccordionItem
            className="border-none"
            key={path}
            value={siderSlug[1]}
          >
            <AccordionTrigger className="p-2 font-semibold">
              {name}
            </AccordionTrigger>
            <AccordionContent className="pl-3 grid gap-1">
              {children?.map(
                ({ name: childrenName, path: childrenPath, route }) => (
                  <Link key={childrenPath} href={route}>
                    <Toggle
                      variant="underline"
                      className="w-full justify-start p-2 h-7 text-nav-foreground"
                      aria-label="Toggle italic"
                      pressed={route === pathname}
                    >
                      {childrenName}
                    </Toggle>
                  </Link>
                )
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
