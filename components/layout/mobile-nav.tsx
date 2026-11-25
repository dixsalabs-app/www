"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  function go(href: string) {
    dialogRef.current?.close()
    router.push(href)
  }

  useEffect(() => {
    dialogRef.current?.close()
  }, [pathname])

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
        aria-haspopup="dialog"
        aria-label="Open menu"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Menu className="size-5" aria-hidden />
      </button>
      <dialog ref={dialogRef} className="nav-dialog" aria-label="Site menu">
        <div className="flex items-center justify-between px-5 py-3">
          <Logo onClick={() => dialogRef.current?.close()} />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Close menu"
            onClick={() => dialogRef.current?.close()}
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-between px-5 pb-8">
          <ul className="mt-8 flex flex-col">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 font-serif text-3xl font-medium tracking-tight",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                    onClick={(event) => {
                      event.preventDefault()
                      go(item.href)
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-5 text-sm font-medium text-brand-foreground"
            onClick={(event) => {
              event.preventDefault()
              go("/contact")
            }}
          >
            Start a project
          </Link>
        </nav>
      </dialog>
    </div>
  )
}
