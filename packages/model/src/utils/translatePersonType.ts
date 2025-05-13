import { PersonType } from '../enums/PersonType'

export const translatePersonType = (type: PersonType) => {
    switch (type) {
        case PersonType.ADMIN:
            return 'Администратор'
        case PersonType.MODERATOR:
            return 'Модератор'
        case PersonType.SELLER:
            return 'Продавец'
        default:
            return 'Неизвестный'
    }
}
