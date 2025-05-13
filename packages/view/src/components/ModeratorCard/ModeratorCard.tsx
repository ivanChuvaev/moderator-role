import React from 'react'

import { Avatar } from '../Avatar'
import { Button } from '../Button'

import styles from './ModeratorCard.module.scss'
import { PersonModerator, PersonAdmin, PersonType } from '@model'
import { pluralize } from '@view/utils/pluralize'
import { useGameData } from '@view/hooks/useGameData'
import { translatePersonType } from '@model'

type ModeratorCardProps = {
    person: PersonModerator | PersonAdmin
}

export const ModeratorCard: React.FC<ModeratorCardProps> = (props) => {
    const { person } = props

    const statistics = useGameData((engine) =>
        engine.getModeratorStatistics(person.id)
    )

    if (!person) {
        return <div>Модератор не найден</div>
    }

    if (!statistics) {
        return <div>У модератора нет статистики</div>
    }

    return (
        <div className={styles.moderator_card}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Avatar src={person.avatarSrc ?? 'images/empty.png'} />
                </div>

                <div className={styles.personal_info}>
                    <div className={styles.nameRow}>
                        <h3>
                            {person.firstName} {person.lastName}
                        </h3>
                        <span>{translatePersonType(person.type)}</span>
                        <div className={styles.actions}>
                            {person.type === PersonType.MODERATOR && (
                                <span className={styles.age}>
                                    {pluralize(
                                        Math.floor(
                                            (new Date().getTime() -
                                                person.birthdate) /
                                                1000 /
                                                31536000
                                        ),
                                        '&_ год',
                                        '&_ года',
                                        '&_ лет'
                                    )}
                                </span>
                            )}
                            {person.type === PersonType.MODERATOR && (
                                <Button
                                    className={styles.fire_button}
                                    variant="danger"
                                >
                                    Уволить
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className={styles.stats_row}>
                        <div className={styles.stat_item}>
                            <span className={styles.stat_label}>
                                Всего проверено:
                            </span>
                            <span className={styles.stat_value}>
                                {statistics.totalChecked}
                            </span>
                        </div>
                        <div className={styles.stat_item}>
                            <span className={styles.stat_label}>Оспорено:</span>
                            <span className={styles.stat_value}>
                                {statistics.totalDisputed}
                            </span>
                        </div>
                        <div className={styles.stat_item}>
                            <span className={styles.stat_label}>
                                Выиграно споров:
                            </span>
                            <span className={styles.stat_value}>
                                {statistics.totalWon}
                            </span>
                        </div>
                        <div className={styles.stat_item}>
                            <span className={styles.stat_label}>
                                Проиграно споров:
                            </span>
                            <span className={styles.stat_value}>
                                {statistics.totalLost}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.details}>
                <div className={styles.detail_item}>
                    {person.type === PersonType.MODERATOR && (
                        <>
                            <span className={styles.detail_label}>Стаж:</span>
                            <span className={styles.detail_value}>
                                {pluralize(
                                    Math.floor(
                                        (new Date().getTime() -
                                            person.employmentDate) /
                                            1000 /
                                            31536000
                                    ),
                                    '&_ год',
                                    '&_ года',
                                    '&_ лет'
                                )}
                            </span>
                        </>
                    )}
                </div>
                {person.type === PersonType.MODERATOR && (
                    <div className={styles.detailItem}>
                        <span className={styles.detail_label}>Зарплата:</span>
                        <span className={styles.detail_value}>
                            ₽{person.salary}
                        </span>
                    </div>
                )}
                <div className={styles.detailItem}>
                    <span className={styles.detail_label}>
                        Скорость проверки:
                    </span>
                    <span className={styles.detail_value}>
                        {statistics.avgSpeed} товаров/день
                    </span>
                </div>
            </div>

            <div className={styles.today_stats}>
                <div className={styles.today_column}>
                    <div className={styles.today_stat}>
                        <span className={styles.today_label}>
                            Проверено сегодня:
                        </span>
                        <span className={styles.today_value}>
                            {statistics.todayChecked}
                        </span>
                    </div>
                    <div className={styles.todayStat}>
                        <span className={styles.today_label}>
                            Оспорено сегодня:
                        </span>
                        <span className={styles.today_value}>
                            {statistics.todayDisputed}
                        </span>
                    </div>
                </div>
                <div className={styles.todayColumn}>
                    <div className={styles.todayStat}>
                        <span className={styles.today_label}>
                            Проиграно сегодня:
                        </span>
                        <span className={styles.today_value}>
                            {statistics.todayLost}
                        </span>
                    </div>
                    <div className={styles.todayStat}>
                        <span className={styles.today_label}>
                            Выиграно сегодня:
                        </span>
                        <span className={styles.today_value}>
                            {statistics.todayWon}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
