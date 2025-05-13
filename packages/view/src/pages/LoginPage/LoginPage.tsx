import { FC } from 'react'

import { PageLayout } from '@view/layouts/PageLayout'

import styles from './LoginPage.module.scss'
import { LoginForm } from '@view/components/LoginForm'
import { Paper } from '@view/ui/Paper'
import { Link } from 'react-router-dom'

interface LoginPageProps {
    isChatMode?: boolean
}

export const LoginPage: FC<LoginPageProps> = () => {
    return (
        <PageLayout fullHeight>
            <div className={styles.wrapper}>
                <Paper className={styles.paper}>
                    <LoginForm className={styles.form} />
                    <div className={styles['register-line']}>
                        <span>
                            Нет аккаунта?
                        </span>
                        &nbsp;
                        <Link
                            to="/register"
                            className={styles['register-link']}
                        >
                            Регистрация
                        </Link>
                    </div>
                </Paper>
            </div>
        </PageLayout>
    )
}
