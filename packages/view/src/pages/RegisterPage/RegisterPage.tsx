import { FC } from 'react'

import { PageLayout } from '@view/layouts/PageLayout'

import styles from './RegisterPage.module.scss'
import { RegisterForm } from '@view/components/RegisterForm'
import { Paper } from '@view/ui/Paper'
import { Link } from 'react-router-dom'

export const RegisterPage: FC = () => {
    return (
        <PageLayout fullHeight>
            <div className={styles.wrapper}>
                <Paper className={styles.paper}>
                    <RegisterForm className={styles.form} />
                    <div className={styles['login-line']}>
                        <span>Уже есть аккаунт?</span>
                        &nbsp;
                        <Link to="/login" className={styles['login-link']}>
                            Войти
                        </Link>
                    </div>
                </Paper>
            </div>
        </PageLayout>
    )
}
