import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './GlobalHeader.module.scss'

export const GlobalHeader: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <Link to="/moderators">
                    <div className={styles.header_logo}>Модератор</div>
                </Link>
                <nav className={styles.header_nav}>
                    <ul>
                        <li>Сотрудники</li>
                        <Link to="/chat">
                            <li>Чат</li>
                        </Link>
                        <Link to="/">
                            <li>Товары</li>
                        </Link>

                        <li>ЛК</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
