import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import './Paper.scss'

type PaperProps = {
    children: ReactNode
    className?: string
    style?: CSSProperties
}

export const Paper: FC<PaperProps> = (props) => {
    const { children, className, style } = props
    return (
        <div className={classNames('ui-paper', className)} style={style}>
            {children}
        </div>
    )
}
