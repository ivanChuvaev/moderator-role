import { Outlet } from 'react-router-dom'
import { GlobalHeader } from './GlobalHeader'
import { GlobalFooter } from './GlobalFooter'
import { GlobalLayoutContext } from './GlobalLayoutContext'
import styles from './GlobalLayout.module.scss'
import { GameResultModal } from '@view/components/GameResultModal/GameResultModal'
import { useAuthorizationStorage } from '@view/storage'
import { CSSProperties, ReactNode, useMemo, useState } from 'react'
import { HintDrawer } from '@view/components/HintDrawer'
import { DevelopmentMode } from '@view/components/DevelopmentMode'

export const GlobalLayout = () => {
    const [authorizedStorage] = useAuthorizationStorage()
    const [headerHeight, setHeaderHeight] = useState(0)
    const [footerHeight, setFooterHeight] = useState(0)

    const providerValue = useMemo(
        () => ({
            headerHeight,
            footerHeight,
            setHeaderHeight,
            setFooterHeight,
        }),
        [headerHeight, footerHeight, setHeaderHeight, setFooterHeight]
    )

    let content: ReactNode

    if (authorizedStorage) {
        content = (
            <>
                <GlobalHeader />
                <Outlet />
                <GameResultModal />
                <GlobalFooter />
            </>
        )
    } else {
        content = <Outlet />
    }

    return (
        <GlobalLayoutContext.Provider value={providerValue}>
            <DevelopmentMode>
                <HintDrawer>
                    <div
                        className={styles['global-layout']}
                        style={
                            {
                                '--global-layout-header-height': `${headerHeight}px`,
                                '--global-layout-footer-height': `${footerHeight}px`,
                            } as CSSProperties
                        }
                    >
                        {content}
                    </div>
                </HintDrawer>
            </DevelopmentMode>
        </GlobalLayoutContext.Provider>
    )
}
