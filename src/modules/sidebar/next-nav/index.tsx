"use client";

import { usePathname } from "next/navigation";
import { NavLink } from "@/modules/nav";
import { useContext, useMemo } from "react";
import { RouteContext } from "@/components/provider/route-provider";

export function NextNav() {
  const menus = useContext(RouteContext);
  const pagePath = decodeURIComponent(usePathname());
  const secondaryMenus = useMemo(
    () =>
      menus.find(({ path }) => new RegExp(`^${path}(?=/?)`).test(pagePath))
        ?.children,
    [menus, pagePath]
  );

  return (
    <div className="flex h-full px-6 items-center bg-(--background)/95 rounded shadow-lg gap-4">
      {secondaryMenus?.map(({ name, path }) => (
        <NavLink
          key={path}
          href={path}
          pressed={new RegExp(`^${path}`).test(pagePath)}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
}
