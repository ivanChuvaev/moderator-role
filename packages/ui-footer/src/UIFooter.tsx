import styles from './UIFooter.module.css'
import cn from 'classnames'

export const UIFooter = () => {
    return (
        <div className={styles.footer}>
            <ul
                className={cn(styles['footer-item'], styles.links)}
                test-id="links-1"
            >
                <li>
                    <a href="#">First link</a>
                </li>
                <li>
                    <a href="#">Second link</a>
                </li>
                <li>
                    <a href="#">Third link</a>
                </li>
            </ul>
            <ul
                className={cn(styles['footer-item'], styles.links)}
                test-id="links-2"
            >
                <li>
                    <a href="#">Fourth link</a>
                </li>
                <li>
                    <a href="#">Fifth link</a>
                </li>
                <li>
                    <a href="#">Sixth link</a>
                </li>
            </ul>
            <div
                className={cn(styles['footer-item'], styles.company)}
                test-id="company"
            >
                <a href="#">Company</a>
            </div>
        </div>
    )
}
