import { useAuthorizationStorage } from '@view/storageModule'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectedProps = {
    children: React.ReactNode
}

export const Protected: FC<ProtectedProps> = (props) => {
    const { children } = props
    const navigate = useNavigate()
    const [authorizedStorage] = useAuthorizationStorage()

    useEffect(() => {
        if (!authorizedStorage) {
            navigate('/login', { replace: true })
        }
    }, [authorizedStorage])

    if (!authorizedStorage) {
        return null
    }

    return children
}
