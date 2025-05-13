export interface LoginFormValues {
    login: string
    password: string
}

export interface ValidationErrors {
    login?: string
    password?: string
}

export const validateLoginForm = (
    values: LoginFormValues
): ValidationErrors => {
    const errors: ValidationErrors = {}

    if (!values.login.trim()) {
        errors.login = 'Введите логин'
    }

    if (!values.password) {
        errors.password = 'Введите пароль'
    } else if (values.password.length < 6) {
        errors.password = 'Пароль должен содержать минимум 6 символов'
    }

    return errors
}
