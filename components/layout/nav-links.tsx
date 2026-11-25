"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"

export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {nav.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex h-10 items-center px-3 text-sm transition-colors duration-300 ease-studio",
                active
                  ? "text-brand-ink"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function NavLinksFallback({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {nav.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="inline-flex h-10 items-center px-3 text-sm text-muted-foreground"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
