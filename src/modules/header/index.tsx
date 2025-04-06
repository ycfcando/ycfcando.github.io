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
import icon from "@/static/icon.png";

export default function Header() {
  const routesData = useContext(RouteContext);
  const navRoutes = routesData?.filter((route) => route.level === 1);
  const pathname = usePathname();
  const currentNavPath = pathname?.match(/^\/[a-zA-Z]+/)?.[0];

  return (
    <header className="flex justify-center w-full h-[48px] shadow-[inset_0_-1px_0_0_var(--skeleton-border)] backdrop-blur-md fixed top-0 z-[1000] transition-transform duration-300">
      <NavContainer>
        <NavHome icon={icon}>Hypoxia</NavHome>
        <NavContent>
          {navRoutes?.map(({ route, path, name }) => {
            return (
              <NavLink
                key={path}
                href={route}
                pressed={route === currentNavPath}
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
