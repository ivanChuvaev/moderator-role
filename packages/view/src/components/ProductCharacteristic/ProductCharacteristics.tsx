import { getRestrictionsByCategory } from '@model'
import { FullProduct } from '@model'
import { useMemo } from 'react'
import { useGameData } from '@view/hooks/useGameData'
import { useDevelopmentMode } from '@view/components/DevelopmentMode'

type ProductCharacteristicsProps = {
    product: FullProduct
    className?: string
}

export const ProductCharacteristics = (props: ProductCharacteristicsProps) => {
    const { product, className } = props

    const { isDevelopmentMode } = useDevelopmentMode()

    const wrongFields = useGameData((engine) =>
        engine.getProductWrongFields(product.id)
    )

    const restrictions = useMemo(
        () => getRestrictionsByCategory(product.category),
        [product]
    )

    return (
        <div className={className}>
            {Object.entries(restrictions).map(([key, restriction]) => (
                <div key={key}>
                    {isDevelopmentMode && (
                        <>{wrongFields.includes(key) ? '❌' : '✅'} </>
                    )}
                    {restriction.translation}: {(product as any)[key]}
                </div>
            ))}
        </div>
    )
}
