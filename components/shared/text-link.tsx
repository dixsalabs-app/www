import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-foreground",
        className,
      )}
    >
      <span className="underline decoration-border underline-offset-4 transition-colors group-hover:decoration-foreground">
        {children}
      </span>
      <ArrowRight
        className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  )
}
