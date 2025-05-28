import { useContext } from "react"
import { HintDrawerContext } from "./HintDrawerContext"

export const useHintDrawer = () => {
    const context = useContext(HintDrawerContext)

    if (!context) {
        throw new Error('useHintDrawer out of context')
    }

    return context
}
