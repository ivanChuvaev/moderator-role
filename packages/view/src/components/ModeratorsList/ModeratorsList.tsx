import { FC } from 'react'

import { moderatorData } from '../../../mockData'
import ModeratorCard from '../ModeratorCard/ModeratorCard'

import styles from './ModeratorsList.module.scss'

interface ModeratorsListProps {}

const ModeratorsList: FC<ModeratorsListProps> = () => {
    console.log(moderatorData)

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

export default ModeratorsList
