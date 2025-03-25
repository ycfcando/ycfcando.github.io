"use client";

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

export default function Header({
  navData,
}: {
  navData: { path: string; text: string }[];
}) {
  const pathname = usePathname();
  const currentNavPath = pathname?.match(/^\/[a-zA-Z]+/)?.[0];

  return (
    <header className="flex justify-center w-full h-[48px] shadow-[inset_0_-1px_0_0_var(--skeleton-border)] backdrop-blur-md fixed top-0 z-[1000] transition-transform duration-300">
      <NavContainer>
        <NavHome icon={icon}>Hypoxia</NavHome>
        <NavContent>
          {navData?.map(({ path, text }) => (
            <NavLink key={path} href={path} pressed={path === currentNavPath}>
              {text}
            </NavLink>
          ))}
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
