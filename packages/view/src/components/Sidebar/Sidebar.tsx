import { FC } from 'react'

import ChatsList from '../ChatsList/ChatsList'
import Filter from '../Filter/Filter'

import styles from './Sidebar.module.scss'

interface SidebarProps {
    width?: string
    showChats: boolean
}

const Sidebar: FC<SidebarProps> = ({ width = '300px', showChats }) => {
    return (
        <div className={styles.sidebar} style={{ width }}>
            {showChats ? <ChatsList /> : <Filter />}
        </div>
    )
}

export default Sidebar
