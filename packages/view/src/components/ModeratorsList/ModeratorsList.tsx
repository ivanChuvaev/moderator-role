import { FC } from 'react'

import { ModeratorCard } from '../ModeratorCard'

import styles from './ModeratorsList.module.scss'
import { useGameData } from '@view/hooks/useGameData'
import cn from 'classnames'
import { useAuthorizationStorage } from '@view/storageModule'

type ModeratorsListProps = {
    className?: string
}

export const ModeratorsList: FC<ModeratorsListProps> = ({ className }) => {
    const moderators = useGameData((engine) => [
        ...engine.getPersonModerators(),
    ])

    const [authorizationStorage] = useAuthorizationStorage()

    const admin = useGameData((engine) =>
        engine.getFullAdminByLogin(authorizationStorage!.login)
    )

    return (
        <div className={cn(styles['moderators-list'], className)}>
            {admin && <ModeratorCard person={admin} />}
            {moderators.map((moderator) => (
                <ModeratorCard key={moderator.id} person={moderator} />
            ))}
        </div>
    )
}
