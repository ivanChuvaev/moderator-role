import { FC, useEffect, useRef } from 'react'
import { UIFooter } from '@moderator-role/ui-footer'
import '@moderator-role/ui-footer/dist/ui-footer.min.css'

import styles from './GlobalFooter.module.scss'
import { Container } from '@view/ui/Container'
import { useGlobalLayout } from './hooks/useGlobalLayout'

export const GlobalFooter: FC = () => {
    const { setFooterHeight } = useGlobalLayout()

    const footerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const footer = footerRef.current

        if (!footer) {
            return
        }

        const handleResize = () => {
            setFooterHeight(footer.clientHeight)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [footerRef.current])

    return (
        <Container
            as="footer"
            ref={footerRef}
            className={styles.footer}
            aria-atomic="true"
        >
            <UIFooter />
        </Container>
    )
}
