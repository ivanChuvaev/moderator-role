import { Field } from '@base-ui-components/react/field'
import { Form } from '@base-ui-components/react/form'
import { validateLoginForm } from '../../utils/loginValidation'
import styles from './LoginForm.module.scss'
import { Button } from '../Button'
import { useNavigate } from 'react-router-dom'
import { FC, useState } from 'react'

export const LoginForm: FC = () => {
    const navigate = useNavigate()

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

        setLoading(true)

        try {
            const response = await fakeLogin(values.login, values.password)
            if (response.success) {
                navigate('/')
            } else {
                setErrors({
                    login: response.error || 'Неверные учетные данные',
                    password: response.error || 'Неверные учетные данные',
                })
            }
        } catch (error) {
            setErrors({
                login: 'Ошибка соединения',
                password: 'Ошибка соединения',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            className={styles.Form}
            errors={errors}
            onClearErrors={() => setErrors({})}
            onSubmit={handleSubmit}
        >
            <Field.Root name="login" className={styles.Field}>
                <Field.Label className={styles.Label}>Логин</Field.Label>
                <Field.Control
                    type="text"
                    required
                    placeholder="Введите логин"
                    className={styles.Input}
                    disabled={loading}
                />
                <Field.Error className={styles.Error} />
            </Field.Root>

            <Field.Root name="password" className={styles.Field}>
                <Field.Label className={styles.Label}>Пароль</Field.Label>
                <Field.Control
                    type="password"
                    required
                    placeholder="Введите пароль"
                    className={styles.Input}
                    disabled={loading}
                />
                <Field.Error className={styles.Error} />
            </Field.Root>

            <Button
                disabled={loading}
                type="submit"
                className={styles.Button}
                label={loading ? 'Играть...' : 'Играть'}
            />
        </Form>
    )
}

async function fakeLogin(login: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (login === 'admin' && password === 'admin123') {
        return { success: true }
    }

    return {
        success: false,
        error: 'Неверный логин или пароль',
    }
}
