import { ProductCategory } from '@model'
import { FullProduct } from '@model'
import { ReactNode } from 'react'

type ProductCharacteristicsProps = {
    product: FullProduct
    className?: string
}

export const ProductCharacteristics = (props: ProductCharacteristicsProps) => {
    const { product, className } = props

    let content: ReactNode

    switch (product.category) {
        case ProductCategory.LAPTOP:
            content = (
                <>
                    <div>Диагональ: {product.diagonal}</div>
                    <div>Масса: {product.mass}</div>
                    <div>Ширина: {product.width}</div>
                    <div>Высота: {product.height}</div>
                    <div>Мощность: {product.power}</div>
                    <div>Оперативная память: {product.ram}</div>
                </>
            )
            break
        case ProductCategory.MICROWAVE:
            content = (
                <>
                    <div>Мощность: {product.power}</div>
                    <div>Объем: {product.volume}</div>
                    <div>Масса: {product.mass}</div>
                    <div>Ширина: {product.width}</div>
                    <div>Высота: {product.height}</div>
                    <div>Глубина: {product.depth}</div>
                    <div>
                        Максимальная температура: {product.maxTemperature}
                    </div>
                    <div>Частота: {product.microwaveFrequency}</div>
                </>
            )
            break
        case ProductCategory.FAN_HEATER:
            content = (
                <>
                    <div>Мощность: {product.power}</div>
                    <div>Масса: {product.mass}</div>
                    <div>Ширина: {product.width}</div>
                    <div>Высота: {product.height}</div>
                    <div>Глубина: {product.depth}</div>
                    <div>
                        Максимальная температура: {product.maxTemperature}
                    </div>
                    <div>Площадь: {product.area}</div>
                </>
            )
            break
        case ProductCategory.REFRIGERATOR:
            content = (
                <>
                    <div>Масса: {product.mass}</div>
                    <div>Ширина: {product.width}</div>
                    <div>Высота: {product.height}</div>
                    <div>Глубина: {product.depth}</div>
                    <div>Объем: {product.volume}</div>
                </>
            )
            break
        default:
            content = null
    }

    if (!content) return null

    return <div className={className}>{content}</div>
}
