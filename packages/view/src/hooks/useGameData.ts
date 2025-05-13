import { Engine } from '@model/Engine'
import { game } from '@view/game'
import { useEffect, useState } from 'react'

export const useGameData = <T>(
    selector: (engine: Engine) => T,
    deps?: any[]
) => {
    const [data, setData] = useState<T>(() => game.select(selector))

    useEffect(() => {
        const callback = () => {
            setData((prev: T) => {
                const newData = game.select(selector)
                if (JSON.stringify(prev) === JSON.stringify(newData)) {
                    return prev
                }
                return newData
            })
        }

        game.select(callback)

        game.subscribe(callback)
        return () => {
            game.unsubscribe(callback)
        }
    }, deps ?? [])

    return data
}
