import { MutableRefObject, useEffect, useState } from 'react'

export const useSizeTracker = (ref: MutableRefObject<HTMLElement | null>) => {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        const element = ref.current

        if (!element) {
            return
        }

        const handler = () => {
            const { width, height } = element.getBoundingClientRect()

            setSize((prev) => {
                if (prev.width === width && prev.height === height) {
                    return prev
                }

                return {
                    width,
                    height,
                }
            })
        }

        handler()

        const resizeObserver = new ResizeObserver(handler)

        resizeObserver.observe(element)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    return size
}
