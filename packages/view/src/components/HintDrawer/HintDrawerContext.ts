import { createContext } from 'react'
import { ProductCategory } from '@model'

export type HintDrawerContextType = {
    open: boolean
    setOpen: (open: boolean) => void
    setCategory: (category: ProductCategory) => void
}

export const HintDrawerContext = createContext<HintDrawerContextType | null>(
    null
)
