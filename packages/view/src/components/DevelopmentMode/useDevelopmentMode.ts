import { useContext } from "react"
import { DevelopmentModeContext } from "./DevelopmentModeContext"

export const useDevelopmentMode = () => {
    const context = useContext(DevelopmentModeContext)

    if (context === null) {
        throw new Error('useDevelopmentMode out of context')
    }

    return context
}
