import { FC, useEffect } from 'react'

import styles from './ProductFilter.module.scss'
import cn from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { ProductCategory } from '@model/enums/ProductCategory'
import { Slider } from '../Slider'

type ProductFilterProps = {
    className?: string
    defaultFilters: any
    onChangeFilters: (values: any) => void
}

export const ProductFilter: FC<ProductFilterProps> = (props) => {
    const { className, defaultFilters, onChangeFilters } = props

    const { control, register, subscribe } = useForm({
        defaultValues: defaultFilters,
    })

    useEffect(() => {
        return subscribe({
            formState: {
                values: true,
            },
            callback: ({ values }) => {
                onChangeFilters(values)
            },
        })
    }, [subscribe])

    return (
        <div className={cn(styles['product-filter'], className)}>
            <div className={styles.form}>
                <label>Category:</label>
                <div className={styles['radio-group']}>
                    <div className={styles['radio-group__item']}>
                        <input
                            {...register('category')}
                            type="radio"
                            value="ALL"
                            id="all"
                        />
                        <label htmlFor="all">All</label>
                    </div>
                    <div className={styles['radio-group__item']}>
                        <input
                            {...register('category')}
                            type="radio"
                            value={ProductCategory.REFRIGERATOR}
                            id="refrigerator"
                        />
                        <label htmlFor="refrigerator">Refrigerator</label>
                    </div>
                    <div className={styles['radio-group__item']}>
                        <input
                            {...register('category')}
                            type="radio"
                            value={ProductCategory.LAPTOP}
                            id="laptop"
                        />
                        <label htmlFor="laptop">Laptop</label>
                    </div>
                    <div className={styles['radio-group__item']}>
                        <input
                            {...register('category')}
                            type="radio"
                            value={ProductCategory.MICROWAVE}
                            id="microwave"
                        />
                        <label htmlFor="microwave">Microwave</label>
                    </div>
                    <div className={styles['radio-group__item']}>
                        <input
                            {...register('category')}
                            type="radio"
                            value={ProductCategory.FAN_HEATER}
                            id="fan-heater"
                        />
                        <label htmlFor="fan-heater">Fan Heater</label>
                    </div>
                </div>
                <label>Price range:</label>
                <Controller
                    control={control}
                    name="price_range"
                    render={({ field: { ref, ...field } }) => (
                        <Slider
                            {...field}
                            stateRef={ref}
                            min={0}
                            max={800}
                            step={100}
                            sliderWidth="100%"
                            animateOnClick="0s"
                            marks={true}
                            marksValuesCount={9}
                            marksCount={9}
                        />
                    )}
                />
            </div>
        </div>
    )
}
