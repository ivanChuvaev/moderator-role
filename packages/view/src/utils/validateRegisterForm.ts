export interface RegisterFormValues {
    login: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    middleName: string
}

export interface ValidationErrors {
    login?: string
    password?: string
    confirmPassword?: string
    firstName?: string
    lastName?: string
    middleName?: string
}

export const validateRegisterForm = (
    values: RegisterFormValues
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

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Введите пароль'
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Пароли не совпадают'
    }

    if (!values.firstName.trim()) {
        errors.firstName = 'Введите имя'
    }

    if (!values.lastName.trim()) {
        errors.lastName = 'Введите фамилию'
    }

    return errors
}
