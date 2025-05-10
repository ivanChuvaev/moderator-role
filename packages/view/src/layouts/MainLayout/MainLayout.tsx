import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Content from '../../components/Content/Content'
import Sidebar from '../../components/Sidebar/Sidebar'

import styles from './MainLayout.module.scss'

interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const isChatMode = location.pathname === '/chat'

    const handleOpenChat = () => navigate('/chat')

    return (
        <main className={styles.main_layout}>
            <Sidebar showChats={isChatMode} />
            <Content showChat={isChatMode} onOpenChat={handleOpenChat} />
        </main>
    )
}

export default MainLayout
