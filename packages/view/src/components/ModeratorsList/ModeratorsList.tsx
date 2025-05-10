import { FC } from 'react'

import { moderatorData } from '@view/mockData'
import { ModeratorCard } from '../ModeratorCard'

import styles from './ModeratorsList.module.scss'

interface ModeratorsListProps {}

export const ModeratorsList: FC<ModeratorsListProps> = () => {
    return (
        <div className={styles.main_content}>
            <h2>Модераторы</h2>
            <div className={styles.products_container}>
                {moderatorData.map((moderator) => (
                    <ModeratorCard
                        key={moderator.person_id}
                        moderatorId={moderator.person_id}
                    />
                ))}
            </div>
        </div>
    )
}
