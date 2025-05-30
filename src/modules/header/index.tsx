"use client";

import { useContext } from "react";
import { RouteContext } from "@/components/provider/route-provider";
import {
  NavContainer,
  NavHome,
  NavContent,
  NavLink,
  NavRightContainer,
} from "@/modules/nav";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeSwitch } from "@/modules/theme-switch";
import { usePathname } from "next/navigation";
import archor from "public/archor.webp";

export default function Header() {
  const menus = useContext(RouteContext);
  const pagePath = decodeURIComponent(usePathname());

  return (
    <header className="flex w-full h-[48px] sticky justify-center shadow-[inset_0_-1px_0_0_var(--skeleton-border)] backdrop-blur-md top-0 z-[1000] transition-transform duration-300 bg-(--background)/95 shrink-0">
      <NavContainer>
        <NavHome icon={archor}>Hypoxia</NavHome>
        <NavContent>
          {menus?.map(({ path, name }) => {
            return (
              <NavLink
                key={path}
                href={path}
                pressed={new RegExp(`^${path}`).test(pagePath)}
              >
                {name}
              </NavLink>
            );
          })}
        </NavContent>
        <NavRightContainer>
          <Input
            className="w-[200] text-foreground"
            disabled
            placeholder="Search Documentation"
          />
          <ThemeSwitch />
          <Button variant="ghost" size="icon">
            <Github className="h-4 w-4" />
          </Button>
        </NavRightContainer>
      </NavContainer>
    </header>
  );
}
