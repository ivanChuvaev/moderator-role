import { FC, PropsWithChildren, useMemo, useState } from 'react'
import { DevelopmentModeContext } from './DevelopmentModeContext'

export const DevelopmentMode: FC<PropsWithChildren> = ({ children }) => {
    const [isDevelopmentMode, setIsDevelopmentMode] = useState(false)

    const providerValue = useMemo(
        () => ({
            isDevelopmentMode,
            setIsDevelopmentMode,
        }),
        [isDevelopmentMode, setIsDevelopmentMode]
    )

    return (
        <DevelopmentModeContext.Provider value={providerValue}>
            {children}
        </DevelopmentModeContext.Provider>
    )
}
