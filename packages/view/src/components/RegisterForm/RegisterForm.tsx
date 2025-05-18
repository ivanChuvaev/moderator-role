import { Field } from '@base-ui-components/react/field'
import { Form } from '@base-ui-components/react/form'
import { validateRegisterForm } from '../../utils/validateRegisterForm'
import styles from './RegisterForm.module.scss'
import { Button } from '../Button'
import { useNavigate } from 'react-router-dom'
import { FC, useState } from 'react'
import { useRegistrationStorage } from '@view/storageModule'
import { Sex } from '@model/index'

type RegisterFormProps = {
    className?: string
}

export const RegisterForm: FC<RegisterFormProps> = (props) => {
    const { className } = props
    const navigate = useNavigate()

    const [registrationStorage, setRegistrationStorage] =
        useRegistrationStorage()

    const [errors, setErrors] = useState<{
        login?: string
        password?: string
        confirmPassword?: string
        firstName?: string
        lastName?: string
        middleName?: string
    }>({})

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget as HTMLFormElement)

        const values = {
            login: formData.get('login') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            middleName: formData.get('middleName') as string,
        }

        const validationErrors = validateRegisterForm(values)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        if (registrationStorage && registrationStorage[values.login]) {
            setErrors({
                login: 'Такой пользователь уже существует',
            })
            return
        }

        setRegistrationStorage((prev) => ({
            ...prev,
            [values.login]: {
                login: values.login,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                middleName: values.middleName,
            },
        }))

        navigate('/login')
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
                        placeholder="Введите логин"
                        className={styles.input}
                        disabled={loading}
                        autoComplete="off"
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
                        placeholder="Введите пароль"
                        className={styles.input}
                        disabled={loading}
                        autoComplete="new-password"
                    />
                </div>
                <Field.Error className={styles.error} />
            </Field.Root>

            <Field.Root name="confirmPassword" className={styles.field}>
                <Field.Label className={styles.label}>
                    Подтвердите пароль
                </Field.Label>
                <div className={styles['input-wrapper']}>
                    <Field.Control
                        type="password"
                        required
                        placeholder="Введите пароль"
                        className={styles.input}
                        disabled={loading}
                        autoComplete="new-password"
                    />
                </div>
                <Field.Error className={styles.error} />
            </Field.Root>

            <Field.Root name="firstName" className={styles.field}>
                <Field.Label className={styles.label}>Имя</Field.Label>
                <div className={styles['input-wrapper']}>
                    <Field.Control
                        type="text"
                        className={styles.input}
                        placeholder="Введите имя"
                    />
                </div>
                <Field.Error className={styles.error} />
            </Field.Root>

            <Field.Root name="lastName" className={styles.field}>
                <Field.Label className={styles.label}>Фамилия</Field.Label>
                <div className={styles['input-wrapper']}>
                    <Field.Control
                        type="text"
                        className={styles.input}
                        placeholder="Введите фамилию"
                    />
                </div>
                <Field.Error className={styles.error} />
            </Field.Root>

            <Field.Root name="middleName" className={styles.field}>
                <Field.Label className={styles.label}>Отчество</Field.Label>
                <div className={styles['input-wrapper']}>
                    <Field.Control
                        type="text"
                        className={styles.input}
                        placeholder="Введите отчество (необязательно)"
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
                Зарегистрироваться
            </Button>
        </Form>
    )
}

async function fakeRegister(login: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (login === 'admin' && password === 'admin123') {
        return { success: true }
    }

    return {
        success: false,
        error: 'Неверный логин или пароль',
    }
}
