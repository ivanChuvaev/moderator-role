import { createContext } from 'react'

export type DevelopmentModeContextType = {
    isDevelopmentMode: boolean
    setIsDevelopmentMode: (isDevelopmentMode: boolean) => void
}

export const DevelopmentModeContext =
    createContext<DevelopmentModeContextType | null>(null)
