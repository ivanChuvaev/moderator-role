import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <Link to="/">
                    <div className={styles.header_logo}>Модератор</div>
                </Link>
                <nav className={styles.header_nav}>
                    <ul>
                        <li>Сотрудники</li>
                        <Link to="/chat">
                            <li>Чат</li>
                        </Link>

                        <li>Товары</li>
                        <li>ЛК</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
