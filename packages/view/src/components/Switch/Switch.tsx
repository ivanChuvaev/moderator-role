import { Switch as SwitchBase } from '@base-ui-components/react/switch'

import styles from './Switch.module.scss'

type SwitchProps = {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

export const Switch = (props: SwitchProps) => {
    const { checked, onCheckedChange } = props

    return (
        <SwitchBase.Root
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={styles.Switch}
        >
            <SwitchBase.Thumb className={styles.Thumb} />
        </SwitchBase.Root>
    )
}
