import { FC } from 'react'

import { PageLayout } from '@view/layouts/PageLayout'

import styles from './LoginPage.module.scss'
import { LoginForm } from '@view/components/LoginForm'
import { Paper } from '@view/ui/Paper'
import { Link } from 'react-router-dom'
import { useRegistrationStorage } from '@view/storageModule'
import { Button } from '@view/components/Button'

interface LoginPageProps {
    isChatMode?: boolean
}

export const LoginPage: FC<LoginPageProps> = () => {
    const [registration, setRegistration] = useRegistrationStorage()

    const hasAccounts = registration !== null

    const handleDeleteAllAccounts = () => {
        setRegistration(null)
    }

    return (
        <PageLayout fullHeight>
            <div className={styles.wrapper}>
                <Paper className={styles.paper}>
                    <LoginForm className={styles.form} />
                    <div className={styles['register-line']}>
                        <span>Нет аккаунта?</span>
                        &nbsp;
                        <Link
                            to="/register"
                            className={styles['register-link']}
                        >
                            Регистрация
                        </Link>
                    </div>
                </Paper>
                {hasAccounts && (
                    <Button
                        type="button"
                        variant="secondary"
                        className={styles['delete-all-accounts-button']}
                        onClick={handleDeleteAllAccounts}
                    >
                        Удалить все аккаунты
                    </Button>
                )}
            </div>
        </PageLayout>
    )
}
