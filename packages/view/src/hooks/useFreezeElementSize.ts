import { RefObject, useEffect, useRef } from 'react'

export const useFreezeElementSize = (
    ref: RefObject<HTMLElement>,
    freeze = false
) => {
    const sizes = useRef({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        const element = ref.current

        if (!element) {
            return
        }

        if (freeze) {
            const oldWidth = element.style.width
            const oldHeight = element.style.height

            element.style.width = `${sizes.current.width}px`
            element.style.height = `${sizes.current.height}px`

            return () => {
                element.style.width = oldWidth
                element.style.height = oldHeight
            }
        } else {
            const handler = () => {
                const { width, height } = element.getBoundingClientRect()

                sizes.current = {
                    width,
                    height,
                }
            }

            handler()

            const resizeObserver = new ResizeObserver(handler)

            resizeObserver.observe(element)

            return () => {
                resizeObserver.disconnect()
            }
        }
    }, [freeze])
}
