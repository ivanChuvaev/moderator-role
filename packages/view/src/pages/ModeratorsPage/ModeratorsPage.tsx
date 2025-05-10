import { FC } from 'react'

import { Sidebar } from '@view/components/Sidebar/Sidebar'
import { ModeratorsList } from '@view/components/ModeratorsList'

import styles from './ModeratorsPage.module.scss'

interface ModeratorsPageProps {
    isChatMode?: boolean
}

export const ModeratorsPage: FC<ModeratorsPageProps> = ({
    isChatMode = false,
}) => {
    return (
        <main className={styles.main_layout}>
            <Sidebar showChats={isChatMode} />
            <ModeratorsList />
        </main>
    )
}
