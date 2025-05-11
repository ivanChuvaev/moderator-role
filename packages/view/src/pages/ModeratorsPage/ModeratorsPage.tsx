import { FC } from 'react'

import { Sidebar } from '@view/components/Sidebar/Sidebar'
import { ModeratorsList } from '@view/components/ModeratorsList'
import { PageLayout } from '@view/layouts/PageLayout'
import { Paper } from '@view/ui/Paper'

import styles from './ModeratorsPage.module.scss'

interface ModeratorsPageProps {
    isChatMode?: boolean
}

export const ModeratorsPage: FC<ModeratorsPageProps> = ({
    isChatMode = false,
}) => {
    return (
        <PageLayout fullHeight>
            <div className={styles.wrapper}>
                <Paper className={styles.sidebar}>
                    <Sidebar showChats={isChatMode} />
                </Paper>
                <Paper className={styles.content}>
                    <ModeratorsList />
                </Paper>
            </div>
        </PageLayout>
    )
}
