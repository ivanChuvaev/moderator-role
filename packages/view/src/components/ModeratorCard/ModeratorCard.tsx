import React from 'react'

import { moderatorData, personData } from '@view/mockData'
import { Avatar } from '../Avatar'
import { Button } from '../Button'

import styles from './ModeratorCard.module.scss'

interface ModeratorCardProps {
    moderatorId: number
    onFire?: (moderatorId: number) => void
}

export const ModeratorCard: React.FC<ModeratorCardProps> = ({
    moderatorId,
    onFire,
}) => {
    const moderator = moderatorData.find((m) => m.person_id === moderatorId)
    const person = personData.find((p) => p.id === moderatorId)

    if (!moderator || !person) {
        return <div className={styles.notFound}>Модератор не найден</div>
    }

    const birthYear = Math.floor(moderator.birthdate / 10000)
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear

    const employmentYear = Math.floor(moderator.employment_date / 10000)
    const experience = currentYear - employmentYear

    const totalChecked = Math.floor(Math.random() * 500) + 100
    const totalDisputed = Math.floor(totalChecked * 0.2)
    const totalWon = Math.floor(totalDisputed * moderator.correct_factor)
    const totalLost = totalDisputed - totalWon
    const todayChecked = Math.floor(Math.random() * 20) + 5
    const todayDisputed = Math.floor(todayChecked * 0.15)
    const todayWon = Math.floor(todayDisputed * moderator.correct_factor)
    const todayLost = todayDisputed - todayWon
    const avgSpeed = Math.floor(totalChecked / (experience * 365)) || 1

    const handleFire = () => {
        if (onFire) onFire(moderatorId)
    }

    return (
        <div className={styles.moderator_card}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Avatar src={person.avatar_src} />
                </div>

                <div className={styles.personal_info}>
                    <div className={styles.nameRow}>
                        <h3>
                            {person.first_name} {person.last_name}
                        </h3>
                        <div className={styles.actions}>
                            <span className={styles.age}>{age} лет</span>
                            <span className={styles.muk}>
                                МУК: {moderator.correct_factor.toFixed(2)}
                            </span>
                            <Button
                                label="Уволить"
                                className={styles.fire_button}
                                onClick={handleFire}
                                variant="danger"
                            />
                        </div>
                    </div>

                    <div className={styles.stats_row}>
                        <div className={styles.stat_item}>
                            <span className={styles.stat_label}>
                                Всего проверено:
                            </span>
                            <span className={styles.stat_value}>
                                {totalChecked}
                            </span>
                        </div>
                        <div className={styles.stat_item}>
                            <span className={styles.stat_label}>Оспорено:</span>
                            <span className={styles.stat_value}>
                                {totalDisputed}
                            </span>
                        </div>
                        <div className={styles.stat_item}>
                            <span className={styles.stat_label}>
                                Выиграно споров:
                            </span>
                            <span className={styles.stat_value}>
                                {totalWon}
                            </span>
                        </div>
                        <div className={styles.stat_item}>
                            <span className={styles.stat_label}>
                                Проиграно споров:
                            </span>
                            <span className={styles.stat_value}>
                                {totalLost}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.details}>
                <div className={styles.detail_item}>
                    <span className={styles.detail_label}>Стаж:</span>
                    <span className={styles.detail_value}>
                        {experience} лет
                    </span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detail_label}>Зарплата:</span>
                    <span className={styles.detail_value}>
                        ${moderator.salary}
                    </span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detail_label}>
                        Скорость проверки:
                    </span>
                    <span className={styles.detail_value}>
                        {avgSpeed} товаров/день
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
                            {todayChecked}
                        </span>
                    </div>
                    <div className={styles.todayStat}>
                        <span className={styles.today_label}>
                            Оспорено сегодня:
                        </span>
                        <span className={styles.today_value}>
                            {todayDisputed}
                        </span>
                    </div>
                </div>
                <div className={styles.todayColumn}>
                    <div className={styles.todayStat}>
                        <span className={styles.today_label}>
                            Проиграно сегодня:
                        </span>
                        <span className={styles.today_value}>{todayLost}</span>
                    </div>
                    <div className={styles.todayStat}>
                        <span className={styles.today_label}>
                            Выиграно сегодня:
                        </span>
                        <span className={styles.today_value}>{todayWon}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
