/* eslint-disable import/no-named-as-default */
import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import MainLayout from '../layouts/MainLayout/MainLayout'
import ModeratorsLayout from '../layouts/ModeratorsLayout/ModeratorsLayout'
import ProductPageLayout from '../layouts/ProductPageLayout/ProductPageLayout'

import styles from './App.module.scss'

export const App: FC = () => {
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
                    <Route path="/moderators" element={<ModeratorsLayout />} />
                    <Route
                        path="/chat/:productId"
                        element={<MainLayout isChatMode />}
                    />
                    <Route path="/chat/" element={<MainLayout isChatMode />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}
