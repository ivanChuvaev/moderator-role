import { FC } from 'react'

import { PageLayout } from '@view/layouts/PageLayout'
import { Paper } from '@view/ui/Paper'

import styles from './LoginPage.module.scss'
import { LoginForm } from '@view/components/LoginForm'

interface LoginPageProps {
    isChatMode?: boolean
}

export const LoginPage: FC<LoginPageProps> = () => {
    return (
        <PageLayout fullHeight>
            <div className={styles.wrapper}>
                <Paper className={styles.content}>
                    <LoginForm />
                </Paper>
            </div>
        </PageLayout>
    )
}
