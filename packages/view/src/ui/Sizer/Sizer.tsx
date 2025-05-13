import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

type SizerProps = {
    className?: string
    children?: (size: { width: number; height: number }) => React.ReactNode
}

export const Sizer = (props: SizerProps) => {
    const { className, children } = props
    const [size, setSize] = useState({ width: 0, height: 0 })

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (element) {
            const handler = () => {
                const { width, height } = element.getBoundingClientRect()
                setSize({ width, height })
            }

            handler()

            const resizeObserver = new ResizeObserver(handler)

            resizeObserver.observe(element)
            return () => resizeObserver.disconnect()
        }
    }, [])

    return (
        <div ref={ref} className={cn('ui-sizer', className)}>
            {children?.(size)}
        </div>
    )
}
