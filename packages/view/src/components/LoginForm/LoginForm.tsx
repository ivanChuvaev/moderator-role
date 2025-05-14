import { Field } from '@base-ui-components/react/field'
import { Form } from '@base-ui-components/react/form'
import { validateLoginForm } from '../../utils/validateLoginForm'
import styles from './LoginForm.module.scss'
import { Button } from '../Button'
import { useNavigate } from 'react-router-dom'
import { FC, useState } from 'react'
import {
    useAuthorizationStorage,
    useRegistrationStorage,
} from '@view/storageModule'
import { game } from '@view/game'

type LoginFormProps = {
    className?: string
}

export const LoginForm: FC<LoginFormProps> = (props) => {
    const { className } = props
    const navigate = useNavigate()

    const [registrationStore] = useRegistrationStorage()
    const [, setAuthorizationStorage] = useAuthorizationStorage()

    const [errors, setErrors] = useState<{
        login?: string
        password?: string
    }>({})

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget as HTMLFormElement)

        const values = {
            login: formData.get('login') as string,
            password: formData.get('password') as string,
        }

        const validationErrors = validateLoginForm(values)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        if (!registrationStore || !(values.login in registrationStore)) {
            setErrors({
                login: 'Пользователь не зарегистрирован',
            })
            return
        }

        if (registrationStore[values.login].password !== values.password) {
            setErrors({
                password: 'Неверный пароль',
            })
            return
        }

        setAuthorizationStorage({
            login: values.login,
            password: values.password,
        })

        game.restart()

        navigate('/products')
    }

    return (
        <Form
            className={className}
            errors={errors}
            onClearErrors={() => setErrors({})}
            onSubmit={handleSubmit}
        >
            <Field.Root name="login" className={styles.field}>
                <Field.Label className={styles.label}>Логин</Field.Label>
                <div className={styles['input-wrapper']}>
                    <Field.Control
                        type="text"
                        required
                        autoComplete="login"
                        placeholder="Введите логин"
                        className={styles.input}
                        disabled={loading}
                    />
                </div>
                <Field.Error className={styles.error} />
            </Field.Root>

            <Field.Root name="password" className={styles.field}>
                <Field.Label className={styles.label}>Пароль</Field.Label>
                <div className={styles['input-wrapper']}>
                    <Field.Control
                        type="password"
                        required
                        autoComplete="current-password"
                        placeholder="Введите пароль"
                        className={styles.input}
                        disabled={loading}
                    />
                </div>
                <Field.Error className={styles.error} />
            </Field.Root>

            <Button
                disabled={loading}
                type="submit"
                className={styles.button}
                loading={loading}
            >
                Войти
            </Button>
        </Form>
    )
}
