import { Drawer } from 'vaul'
import styles from './HintDrawer.module.scss'
import { useState, useMemo, FC, PropsWithChildren } from 'react'
import { HintDrawerContext } from './HintDrawerContext'
import { ProductCategoryRestrictions } from '../ProductCategoryRestrictions'
import { ProductCategory } from '@model'
import { Toggle, ToggleGroup, Toolbar } from '@base-ui-components/react'

export const HintDrawer: FC<PropsWithChildren> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState<ProductCategory | null>(null)

    const providerValue = useMemo(
        () => ({
            open,
            setOpen,
            setCategory,
        }),
        [open, setOpen, setCategory]
    )

    return (
        <HintDrawerContext.Provider value={providerValue}>
            {children}
            <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
                <Drawer.Portal>
                    <Drawer.Overlay className={styles.overlay} />
                    <Drawer.Content
                        className={styles.content}
                        style={
                            {
                                '--initial-transform': 'calc(100% + 20px)',
                            } as React.CSSProperties
                        }
                    >
                        <div className={styles.dragger} />
                        <div className={styles.hint}>
                            <ToggleGroup
                                className={styles.tabs}
                                value={category ? [category.toString()] : []}
                                onValueChange={(value) => {
                                    const newCategory = Number(value[0])
                                    if (!Number.isNaN(newCategory)) {
                                        setCategory(
                                            newCategory as ProductCategory
                                        )
                                    }
                                }}
                            >
                                <Toggle
                                    value={ProductCategory.FAN_HEATER.toString()}
                                >
                                    Тепловентилятор
                                </Toggle>
                                <Toggle
                                    value={ProductCategory.LAPTOP.toString()}
                                >
                                    Ноутбук
                                </Toggle>
                                <Toggle
                                    value={ProductCategory.MICROWAVE.toString()}
                                >
                                    Микроволновая печь
                                </Toggle>
                                <Toggle
                                    value={ProductCategory.REFRIGERATOR.toString()}
                                >
                                    Холодильник
                                </Toggle>
                            </ToggleGroup>
                            {category && (
                                <ProductCategoryRestrictions
                                    className={styles.restrictions}
                                    category={category}
                                />
                            )}
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </HintDrawerContext.Provider>
    )
}
