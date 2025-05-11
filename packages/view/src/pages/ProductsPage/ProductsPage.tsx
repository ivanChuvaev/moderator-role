import { Content } from '@view/components/Content/Content'
import { Sidebar } from '@view/components/Sidebar/Sidebar'
import { PageLayout } from '@view/layouts/PageLayout'
import { Paper } from '@view/ui/Paper'

import styles from './ProductsPage.module.scss'

export const ProductsPage = () => {
    return (
        <PageLayout fullHeight>
            <div className={styles.wrapper}>
                <Paper className={styles.sidebar}>
                    <Sidebar showChats={false} />
                </Paper>
                <Paper className={styles.content}>
                    <Content
                        showChat={false}
                        productId={1}
                        onOpenChat={() => {}}
                    />
                </Paper>
            </div>
        </PageLayout>
    )
}
