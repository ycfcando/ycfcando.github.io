"use client";

import { useState, useCallback, useMemo, useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { Toggle } from "@/components/ui/toggle";
import { Collapsible } from "@/components/ui/collapsible";
import { ChevronUp } from "lucide-react";
import { RouteContext } from "@/components/provider/route-provider";

export interface ParentSiderInterface {
  text: string;
  path?: LinkProps["href"];
  children?: ChildSiderInterface[];
}

interface ChildSiderInterface {
  text: string;
  path: LinkProps["href"];
}

export function Sidebar() {
  const menus = useContext(RouteContext);
  const pagePath = decodeURIComponent(usePathname());
  const siderMenus = useMemo(
    () =>
      menus
        .find(({ path }) => new RegExp(`^${path}(?=/?)`).test(pagePath))
        ?.children?.find(({ path }) =>
          new RegExp(`^${path}(?=/?)`).test(pagePath)
        ),
    [menus, pagePath]
  );

  const [collapsibleParentSider, setCollapsibleParentSider] =
    useState<string>(pagePath);

  const collapsibleCaller = useCallback(
    (path: string) => {
      if (path !== collapsibleParentSider) {
        setCollapsibleParentSider(path);
      } else {
        setCollapsibleParentSider("");
      }
    },
    [collapsibleParentSider]
  );

  return (
    <div className="grid p-6 grid-cols-1 place-content-start gap-4">
      {siderMenus?.children?.map(({ name, path, children }) => {
        return (
          <Collapsible
            key={path}
            isOpen={new RegExp(`^${path}(?=/?)`).test(collapsibleParentSider)}
          >
            <div data-slot="collapsible-trigger">
              <div
                className="flex items-center justify-between cursor-default"
                onClick={() => collapsibleCaller(path)}
              >
                <Toggle
                  className="text-nav-foreground pl-0"
                  aria-label="Toggle italic"
                  pressed={new RegExp(`^${path}(?=/?)`).test(pagePath)}
                >
                  {name}
                </Toggle>
                <ChevronUp className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </div>
            </div>
            <div
              data-slot="collapsible-content"
              className="grid grid-cols-1 gap-2 pt-2"
            >
              {children?.map(({ name: childName, path: childPath }) => (
                <Link
                  key={childPath}
                  className="leading-none col-span-1"
                  href={childPath}
                >
                  <Toggle
                    className="text-nav-foreground"
                    aria-label="Toggle italic"
                    pressed={childPath === pagePath}
                  >
                    {childName}
                  </Toggle>
                </Link>
              ))}
            </div>
          </Collapsible>
        );
      })}
    </div>
  );
}
