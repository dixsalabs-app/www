import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Dixsa mark: a D with a diamond cut through the bowl.
 * The diamond is the X in Dixsa. Keep this path in step with app/icon.svg.
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M0.8 0.8H6.8C11.4 0.8 14.6 3.7 14.6 8C14.6 12.3 11.4 15.2 6.8 15.2H0.8ZM7.6 4.15 10.9 8 7.6 11.85 4.3 8 7.6 4.15Z"
      />
    </svg>
  )
}

export function Logo({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex items-center gap-2.5 rounded-md", className)}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground">
        <Mark className="size-5" />
      </span>
      <span className="flex flex-col justify-center leading-none">
        <span className="font-serif text-[1.05rem] font-semibold tracking-[0.16em] uppercase">
          Dixsa
        </span>
        <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.46em] text-brand-ink uppercase [margin-right:-0.46em]">
          Labs
        </span>
      </span>
    </Link>
  )
}
