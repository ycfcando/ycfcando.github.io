"use client";

import Link from "next/link";
import { NavToggle } from "@/components/ui/toggle";
import Image, { StaticImageData } from "next/image";

export function NavContainer({ children }: { children: React.ReactNode }) {
  return <div className="container flex items-center gap-6">{children}</div>;
}

export function NavHome({
  icon,
  children,
}: {
  icon: StaticImageData;
  children: React.ReactNode;
}) {
  return (
    <Link className="flex items-center gap-2 shrink-0" href="/">
      <Image
        className="h-6 w-6 rounded-full"
        src={icon}
        alt="icon"
      />
      <span className="font-bold">{children}</span>
    </Link>
  );
}

export function NavLink({
  href,
  pressed,
  children,
}: {
  href: string;
  pressed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <NavToggle aria-label="Toggle italic" pressed={pressed}>
        {children}
      </NavToggle>
    </Link>
  );
}

export function NavContent({ children }: { children: React.ReactNode }) {
  return <nav className="flex gap-6 shrink-0">{children}</nav>;
}

export function NavRightContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex items-center justify-end gap-1">
      {children}
    </div>
  );
}
