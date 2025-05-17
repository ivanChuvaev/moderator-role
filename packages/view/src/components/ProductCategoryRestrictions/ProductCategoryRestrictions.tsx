import { ProductCategory, translateProductCategory } from '@model'

type ProductCategoryRestrictionsProps = {
    category: ProductCategory
}

export const ProductCategoryRestrictions = ({
    category,
}: ProductCategoryRestrictionsProps) => {
    return <div>Restrictions for {translateProductCategory(category)}</div>
}
