import type { ReactNode } from "react"
import { UiPicture } from "@/components/shared/ui-picture"
import type { SceneId } from "@/lib/scenes"
import { cn } from "@/lib/utils"
import type { ProjectTone } from "@/lib/work"

const tones: Record<ProjectTone, string> = {
  copper: "bg-[#9a4630]",
  forest: "bg-[#157a3e]",
  ink: "bg-[#143026]",
  sand: "bg-[#c47a1a]",
  slate: "bg-[#3f6b52]",
  wine: "bg-[#9a4630]",
}

const aspects = {
  video: "aspect-[16/10]",
  cinema: "aspect-[16/10] md:aspect-[2/1]",
  portrait: "aspect-[4/5]",
} as const

export function ProjectFrame({
  tone,
  scene,
  place,
  aspect = "video",
  className,
}: {
  tone: ProjectTone
  scene: SceneId
  place?: ReactNode
  aspect?: keyof typeof aspects
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-[#e7f3ec]",
        aspects[aspect],
        className,
      )}
    >
      <span aria-hidden className={cn("absolute inset-x-0 top-0 z-10 h-1", tones[tone])} />
      <UiPicture scene={scene} />
      <span aria-hidden className="jaali-corner" />
      {place ? <p className="photo-caption">{place}</p> : null}
    </div>
  )
}
