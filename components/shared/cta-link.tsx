import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ctaClass = "h-11 gap-2 rounded-full px-5 text-sm font-medium"

function CtaArrow() {
  return <ArrowRight className="size-4" aria-hidden />
}

export function PrimaryLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const classes = cn(buttonVariants({ variant: "default" }), ctaClass, className)
  const content = (
    <>
      {children}
      <CtaArrow />
    </>
  )
  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

export function SecondaryLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const classes = cn(
    buttonVariants({ variant: "outline" }),
    ctaClass,
    "bg-transparent",
    className,
  )
  const content = (
    <>
      {children}
      <CtaArrow />
    </>
  )
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
