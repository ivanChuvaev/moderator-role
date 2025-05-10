import { FC } from 'react'
import styles from './PageLayout.module.scss'
import { Container } from '@view/ui/Container'
import classNames from 'classnames'

type PageLayoutProps = {
    children: React.ReactNode
    fullHeight?: boolean
}

export const PageLayout: FC<PageLayoutProps> = (props) => {
    const { children, fullHeight = false } = props
    return (
        <div
            className={classNames(styles['page-layout'], {
                [styles['page-layout--full-height']]: fullHeight,
            })}
        >
            <Container>{children}</Container>
        </div>
    )
}
