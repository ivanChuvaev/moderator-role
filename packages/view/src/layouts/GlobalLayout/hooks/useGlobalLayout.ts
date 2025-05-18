import { useContext } from "react"
import { GlobalLayoutContext } from "../GlobalLayoutContext"

export const useGlobalLayout = () => {
    const context = useContext(GlobalLayoutContext)

    if (!context) {
        throw new Error('useGlobalLayout out of context')
    }

    return context
}
