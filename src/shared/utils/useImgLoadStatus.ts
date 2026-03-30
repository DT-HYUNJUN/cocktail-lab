import { useEffect, useState } from "react"
import type { RefObject } from "react"

export function useImgLoadStatus(
  ref: RefObject<HTMLImageElement>,
  src: string,
): boolean {
  const [isImgLoaded, setIsImgLoaded] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (isImgLoaded) {
      setIsImgLoaded(false)
    }

    const updateStatus = (img: HTMLImageElement) => {
      const isLoaded = img.complete && img.naturalHeight !== 0

      setIsImgLoaded(isLoaded)
    }

    ref.current.addEventListener(
      "load",
      () => updateStatus(ref.current as HTMLImageElement),
      { once: true },
    )
  }, [src])

  return isImgLoaded
}
