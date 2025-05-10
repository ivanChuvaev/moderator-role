import './Container.scss'
import classNames from 'classnames'

type ContainerProps = {
    children: React.ReactNode
    className?: string
    classNameContent?: string
}

export const Container = (props: ContainerProps) => {
    const { children, className, classNameContent } = props
    return (
        <div className={classNames("ui-container", className)}>
            <div className={classNames("ui-container-content", classNameContent)}>
                {children}
            </div>
        </div>
    )
}
