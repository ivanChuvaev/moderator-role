import { forwardRef, ReactNode } from 'react'
import './Container.scss'
import classNames from 'classnames'

type ContainerProps<Tag extends keyof JSX.IntrinsicElements> = {
    as?: Tag
    children?: ReactNode
    className?: string
    classNameContent?: string
} & JSX.IntrinsicElements[Tag]

export const Container = forwardRef<any, ContainerProps<any>>((props, ref) => {
    const {
        children,
        className,
        classNameContent,
        as = 'div',
        ...restProps
    } = props

    const ContainerComponent = as

    return (
        <ContainerComponent
            {...restProps}
            ref={ref}
            className={classNames('ui-container', className)}
        >
            <div
                className={classNames('ui-container-content', classNameContent)}
            >
                {children}
            </div>
        </ContainerComponent>
    )
}) as <T extends keyof JSX.IntrinsicElements>(
    props: ContainerProps<T>
) => ReactNode
