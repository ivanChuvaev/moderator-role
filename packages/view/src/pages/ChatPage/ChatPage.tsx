import { Sidebar } from '@view/components/Sidebar/Sidebar'
import { PageLayout } from '@view/layouts/PageLayout'
import { Paper } from '@view/ui/Paper'
import { Outlet } from 'react-router-dom'
import styles from './ChatPage.module.scss'

export const ChatPage = () => {
    return (
        <PageLayout fullHeight>
            <div className={styles.wrapper}>
                <Paper className={styles.sidebar}>
                    <Sidebar showChats />
                </Paper>
                <Paper className={styles.content}>
                    <Outlet />
                </Paper>
            </div>
        </PageLayout>
    )
}
