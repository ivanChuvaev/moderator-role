import { FC } from 'react'

import { ChatsList } from '../ChatsList'
import { ProductFilter } from '../ProductFilter/ProductFilter'

import styles from './Sidebar.module.scss'

interface SidebarProps {
    width?: string
    showChats: boolean
}

export const Sidebar: FC<SidebarProps> = ({ width = '300px', showChats }) => {
    return (
        <div className={styles.sidebar} style={{ width }}>
            {showChats ? <ChatsList /> : <ProductFilter />}
        </div>
    )
}
