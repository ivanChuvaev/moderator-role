import { FC } from 'react'

import ChatsList from '../ChatsList/ChatsList'
import ProductFilter from '../Filter/ProductFilter'

import styles from './Sidebar.module.scss'

interface SidebarProps {
    width?: string
    showChats: boolean
}

const Sidebar: FC<SidebarProps> = ({ width = '300px', showChats }) => {
    return (
        <div className={styles.sidebar} style={{ width }}>
            {showChats ? <ChatsList /> : <ProductFilter />}
        </div>
    )
}

export default Sidebar
