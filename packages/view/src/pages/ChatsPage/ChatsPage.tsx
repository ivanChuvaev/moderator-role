import { PageLayout } from '@view/layouts/PageLayout'
import { Paper } from '@view/ui/Paper'
import { Outlet, useParams } from 'react-router-dom'
import styles from './ChatsPage.module.scss'
import { Protected } from '@view/components/Protected'
import { ChatsList } from '@view/components/ChatsList'

export const ChatsPage = () => {
    const { productId } = useParams()

    return (
        <Protected>
            <PageLayout fullHeight>
                <div className={styles['chats-page']}>
                    <Paper className={styles.sidebar}>
                        <ChatsList selectedProductId={productId} />
                    </Paper>
                    <div className={styles.content}>
                        <Outlet />
                    </div>
                </div>
            </PageLayout>
        </Protected>
    )
}
