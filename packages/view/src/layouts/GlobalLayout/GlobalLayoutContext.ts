import { createContext } from "react"

type GlobalLayoutContextType = {
    headerHeight: number
    footerHeight: number
    setHeaderHeight: (height: number) => void
    setFooterHeight: (height: number) => void
}

export const GlobalLayoutContext = createContext<GlobalLayoutContextType | null>(null)
