import { FC } from 'react'
import classNames from 'classnames'
import './Paper.scss'

type PaperProps = {
    children: React.ReactNode
    className?: string
}

export const Paper: FC<PaperProps> = (props) => {
    const { children, className } = props
    return <div className={classNames('ui-paper', className)}>{children}</div>
}
