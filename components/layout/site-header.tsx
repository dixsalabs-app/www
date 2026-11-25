import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { Logo } from "@/components/layout/logo"
import { MobileNav } from "@/components/layout/mobile-nav"
import { NavLinks, NavLinksFallback } from "@/components/layout/nav-links"
import { PrimaryLink } from "@/components/shared/cta-link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div
        aria-hidden
        className="h-0.5 bg-gradient-to-r from-brand via-marigold to-terracotta"
      />
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Primary" className="hidden md:block">
          <Suspense fallback={<NavLinksFallback />}>
            <NavLinks />
          </Suspense>
        </nav>
        <div className="flex items-center gap-2">
          <PrimaryLink href="/contact" className="hidden sm:inline-flex">
            Start a project
          </PrimaryLink>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
