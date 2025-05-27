import {
    CSSProperties,
    Ref,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react'
import styles from './Slider.module.scss'
import cn from 'classnames'

type SliderProps<T extends number | number[] = number> = {
    className?: string
    style?: CSSProperties
    name?: string
    value?: T
    disabled?: boolean
    min?: number
    max?: number
    step?: number
    sliderWidth?: string
    animateOnClick?: string
    stateRef?: Ref<{ focus: () => void }>
    marks?: boolean
    marksValuesCount?: number
    marksCount?: number
    onChange?: (value: T) => void
}

export const Slider = <T extends number | number[] = number>(
    props: SliderProps<T>
) => {
    const {
        name,
        value,
        disabled,
        onChange,
        min,
        max,
        step,
        className,
        style,
        sliderWidth,
        animateOnClick,
        stateRef,
        marks = false,
        marksValuesCount,
        marksCount,
    } = props

    const sliderRef = useRef<any>(null)

    useImperativeHandle(stateRef, () => ({
        focus: () => {
            console.log('focusing slider')
        },
    }))

    useEffect(() => {
        const slider = sliderRef.current

        if (!slider) return

        const handleChange = (evt: Event) => {
            const customEvent = evt as CustomEvent
            onChange?.(customEvent.detail.values)
        }

        slider.addEventListener('change', handleChange)

        return () => {
            slider.removeEventListener('change', handleChange)
        }
    }, [])

    useEffect(() => {
        const slider = sliderRef.current

        if (!slider || value === undefined) return

        if (typeof value === 'number') {
            slider.value = value
        } else if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i += 1) {
                slider[`value${i + 1}`] = value[i]
            }
        }
    }, [value])

    return (
        <tc-range-slider
            class={cn(
                styles.slider,
                marks && styles['slider--marks'],
                className
            )}
            style={style}
            ref={sliderRef}
            name={name}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            slider-width={sliderWidth}
            animate-onclick={animateOnClick}
            marks={marks ? 'true' : ''}
            marks-values-count={String(marksValuesCount)}
            marks-count={String(marksCount)}
        />
    )
}
