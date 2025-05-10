import { Outlet } from 'react-router-dom'
import { GlobalHeader } from './GlobalHeader'
import { GlobalFooter } from './GlobalFooter'

import styles from './GlobalLayout.module.scss'

export const GlobalLayout = () => {
    return (
        <div className={styles['global-layout']}>
            <GlobalHeader />
            <Outlet />
            <GlobalFooter />
        </div>
    )
}
