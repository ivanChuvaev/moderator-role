import React from 'react'

import styles from './Footer.module.scss'

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_container}>
                <div className={styles.footer_logo}>Лого</div>
                <nav className={styles.footer_nav}>
                    <ul>
                        <li>
                            <a href="#">Главная</a>
                        </li>
                        <li>
                            <a href="#">О нас</a>
                        </li>
                        <li>
                            <a href="#">Услуги</a>
                        </li>
                        <li>
                            <a href="#">Контакты</a>
                        </li>
                    </ul>
                </nav>
                <div className={styles.footer_copyright}>
                    &copy; 2025 Моя Компания. Все права защищены.
                </div>
            </div>
        </footer>
    )
}

export default Footer
