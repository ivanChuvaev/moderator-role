import { FC } from 'react'

import { ModeratorCard } from '../ModeratorCard'

import styles from './ModeratorsList.module.scss'
import { useGameData } from '@view/hooks/useGameData'
import cn from 'classnames'

type ModeratorsListProps = {
    className?: string
}

export const ModeratorsList: FC<ModeratorsListProps> = ({ className }) => {
    const moderators = useGameData((engine) => [
        ...engine.getPersonAdmins(),
        ...engine.getPersonModerators(),
    ])

    return (
        <div className={cn(styles['moderators-list'], className)}>
            {moderators.map((moderator) => (
                <ModeratorCard key={moderator.id} person={moderator} />
            ))}
        </div>
    )
}
