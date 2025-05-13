import { ProductStatus } from '../enums/ProductStatus'

export function translateProductStatus(status: ProductStatus) {
    switch (status) {
        case ProductStatus.APPROVED:
            return 'Принят'
        case ProductStatus.REJECTED:
            return 'Отклонен'
        case ProductStatus.DISPUTED:
            return 'В споре'
        case ProductStatus.PENDING:
            return 'На рассмотрении'
    }
}
