import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Content from '../../components/Content/Content'
import Sidebar from '../../components/Sidebar/Sidebar'

import styles from './MainLayout.module.scss'

interface MainLayoutProps {
    isChatMode?: boolean
}

const MainLayout: FC<MainLayoutProps> = ({ isChatMode = false }) => {
    const { productId } = useParams()
    const navigate = useNavigate()

    const handleOpenChat = (id: number) => {
        navigate(`/chat/${id}`)
    }

    return (
        <main className={styles.main_layout}>
            <Sidebar showChats={isChatMode} />

            <Content
                showChat={isChatMode}
                productId={productId ? parseInt(productId) : 1}
                onOpenChat={handleOpenChat}
            />
        </main>
    )
}

export default MainLayout
