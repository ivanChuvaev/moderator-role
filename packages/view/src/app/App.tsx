/* eslint-disable import/no-named-as-default */
import { FC } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'

import Chat from '../components/Chat/Chat'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import MainLayout from '../layouts/MainLayout/MainLayout'
import ProductPageLayout from '../layouts/ProductPageLayout/ProductPageLayout'

import styles from './App.module.scss'

export const App: FC = () => {
    const params = useParams()
    return (
        <BrowserRouter>
            <div className={styles.app}>
                <Header />
                <Routes>
                    <Route path="/" element={<MainLayout />} />
                    <Route
                        path="/product/:id"
                        element={<ProductPageLayout />}
                    />
                    <Route path="/chat" element={<MainLayout />} />
                    <Route
                        path="/chat/:productId"
                        element={<Chat productId={Number(params.id)} />}
                    />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}
