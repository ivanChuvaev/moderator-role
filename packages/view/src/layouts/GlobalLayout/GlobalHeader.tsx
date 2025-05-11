import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './GlobalHeader.module.scss'
import { Container } from '@view/ui/Container'

export const GlobalHeader: FC = () => {
    return (
        <Container
            className={styles['header-container']}
            classNameContent={styles.header}
        >
            <div>Moderator role game</div>
            <nav className={styles.header_nav}>
                <ul>
                    <Link to="/moderators">
                        <li>Модераторы</li>
                    </Link>
                    <Link to="/chats">
                        <li>Чаты</li>
                    </Link>
                    <Link to="/products">
                        <li>Товары</li>
                    </Link>
                </ul>
            </nav>
        </Container>
    )
}
