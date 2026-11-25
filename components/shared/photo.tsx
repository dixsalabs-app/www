import type { ReactNode } from "react"
import { UiPicture } from "@/components/shared/ui-picture"
import type { SceneId } from "@/lib/scenes"
import { cn } from "@/lib/utils"

export function Photo({
  scene,
  place,
  aspect = "aspect-[4/3]",
  className,
}: {
  scene: SceneId
  place?: ReactNode
  aspect?: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-[#e7f3ec]",
        aspect,
        className,
      )}
    >
      <UiPicture scene={scene} />
      <span aria-hidden className="jaali-corner" />
      {place ? <figcaption className="photo-caption">{place}</figcaption> : null}
    </figure>
  )
}
