import { FC } from 'react'

import ModeratorsList from '../../components/ModeratorsList/ModeratorsList'
import Sidebar from '../../components/Sidebar/Sidebar'

import styles from './ModeratorsLayout.module.scss'

interface ModeratorsLayoutProps {
    isChatMode?: boolean
}

const ModeratorsLayout: FC<ModeratorsLayoutProps> = ({
    isChatMode = false,
}) => {
    return (
        <main className={styles.main_layout}>
            <Sidebar showChats={isChatMode} />
            <ModeratorsList />
        </main>
    )
}

export default ModeratorsLayout
