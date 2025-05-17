import {
    getRestrictionsByCategory,
    ProductCategory,
    translateProductCategory,
} from '@model'

type ProductCategoryRestrictionsProps = {
    category: ProductCategory
}

export const ProductCategoryRestrictions = ({
    category,
}: ProductCategoryRestrictionsProps) => {
    const restrictions = getRestrictionsByCategory(category)
    return (
        <div>
            Restrictions for {translateProductCategory(category)}
            <div style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(restrictions, null, 2)}
            </div>
        </div>
    )
}
