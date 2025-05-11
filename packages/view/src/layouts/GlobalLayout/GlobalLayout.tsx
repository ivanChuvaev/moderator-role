import { Outlet } from 'react-router-dom'
import { GlobalHeader } from './GlobalHeader'
import { GlobalFooter } from './GlobalFooter'

import styles from './GlobalLayout.module.scss'
import { GameResultModal } from '@view/components/GameResultModal/GameResultModal'

export const GlobalLayout = () => {
    return (
        <div className={styles['global-layout']}>
            <GlobalHeader />
            <Outlet />
            <GameResultModal />
            <GlobalFooter />
        </div>
    )
}
