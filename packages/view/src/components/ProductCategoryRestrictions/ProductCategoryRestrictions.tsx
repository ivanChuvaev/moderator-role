import { getRestrictionsByCategory, ProductCategory } from '@model'

type ProductCategoryRestrictionsProps = {
    className?: string
    category: ProductCategory
}

export const ProductCategoryRestrictions = ({
    category,
    className,
}: ProductCategoryRestrictionsProps) => {
    const restrictions = getRestrictionsByCategory(category)
    return (
        <restrictions-renderer
            class={className}
            data={JSON.stringify(restrictions)}
        />
    )
}
