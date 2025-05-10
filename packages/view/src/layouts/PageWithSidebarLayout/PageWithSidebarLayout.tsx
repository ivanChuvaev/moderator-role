import { ReactNode } from 'react'
import styles from './PageWithSidebarLayout.module.scss'
import { Container } from '@view/ui/Container'
type PageWithSidebarLayoutProps = {
    sidebar: ReactNode
    content: ReactNode
}

export const PageWithSidebarLayout = (props: PageWithSidebarLayoutProps) => {
    const { sidebar, content } = props
    return (
        <Container
            className={styles['page-with-sidebar-layout-container']}
            classNameContent={styles['page-with-sidebar-layout']}
        >
            <div className={styles.sidebar}>{sidebar}</div>
            <div className={styles.content}>{content}</div>
        </Container>
    )
}
