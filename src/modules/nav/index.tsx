"use server";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeSwitch } from "@/modules/theme-switch";
import { MyIcon } from "@/modules/my-icon";

export async function Nav() {
  return (
    <section className="container flex h-[48px] fixed top-0 z-[1000] transition-transform duration-300 backdrop-blur-md border-b border-white/20">
      <div className="container flex items-center">
        <Link className="flex items-center gap-2 mr-6" href="/">
          <MyIcon />
          <span className="font-bold">Hypoxia</span>
        </Link>
        <nav>
          <Link href="/javascript">
            <Button className="text-nav-foreground" variant="link">
              Javascript
            </Button>
          </Link>
          <Link href="/react">
            <Button className="text-nav-foreground" variant="link">
              React
            </Button>
          </Link>
          <Link href="/visual">
            <Button className="text-nav-foreground" variant="link">
              Visual
            </Button>
          </Link>
        </nav>
      </div>
      <div className="container flex items-center justify-end gap-1">
        <Input
          className="w-[200] text-foreground"
          disabled
          placeholder="Search Documentation"
        />
        <ThemeSwitch />
        <Button variant="ghost" size="icon">
          <Github className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
