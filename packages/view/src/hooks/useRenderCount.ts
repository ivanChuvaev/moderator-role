import { useDebugValue, useRef } from "react"

export const useRenderCount = () => {
    const renderCountRef = useRef(0)
    renderCountRef.current++

    useDebugValue(renderCountRef.current)
}
