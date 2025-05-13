import { Outlet } from 'react-router-dom'
import { GlobalHeader } from './GlobalHeader'
import { GlobalFooter } from './GlobalFooter'

import styles from './GlobalLayout.module.scss'
import { GameResultModal } from '@view/components/GameResultModal/GameResultModal'
import { useAuthorizationStorage } from '@view/storageModule'
import { ReactNode } from 'react'

export const GlobalLayout = () => {
    const [authorizedStorage] = useAuthorizationStorage()

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

    return <div className={styles['global-layout']}>{content}</div>
}
