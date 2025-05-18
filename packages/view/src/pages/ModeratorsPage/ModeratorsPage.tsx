import { FC } from 'react'

import { ModeratorsList } from '@view/components/ModeratorsList'
import { PageLayout } from '@view/layouts/PageLayout'
import { Paper } from '@view/ui/Paper'

import styles from './ModeratorsPage.module.scss'
import { Protected } from '@view/components/Protected'
import { ModeratorFilter } from '@view/components/ModeratorFilter'

export const ModeratorsPage: FC = () => {
    return (
        <Protected>
            <PageLayout fullHeight>
                <div className={styles.wrapper}>
                    <Paper className={styles.sidebar}>
                        <ModeratorFilter className={styles.filter} />
                    </Paper>
                    <ModeratorsList className={styles['moderator-list']} />
                </div>
            </PageLayout>
        </Protected>
    )
}
