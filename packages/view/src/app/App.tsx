import { FC } from 'react'
import { createBrowserRouter, replace, RouterProvider } from 'react-router-dom'

import { ProductPage } from '@view/pages/ProductPage'
import { ProductsPage } from '@view/pages/ProductsPage'
import { GlobalLayout } from '@view/layouts/GlobalLayout'
import { ModeratorsPage } from '@view/pages/ModeratorsPage'
import { ChatPage } from '@view/pages/ChatPage'
import { LoginPage } from '@view/pages/LoginPage'
import { RegisterPage } from '@view/pages/RegisterPage'
import { ChatsPage } from '@view/pages/ChatsPage/ChatsPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <GlobalLayout />,
        children: [
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
            {
                path: '/',
                loader: () => replace('/products'),
            },
            {
                path: '/products',
                element: <ProductsPage />,
            },
            {
                path: '/product/:id',
                element: <ProductPage />,
            },
            {
                path: '/moderators',
                element: <ModeratorsPage />,
            },
            {
                path: '/chats',
                element: <ChatsPage />,
                children: [
                    {
                        path: '',
                        element: <ChatPage />,
                    },
                    {
                        path: ':productId',
                        element: <ChatPage />,
                    },
                ],
            },
        ],
    },
])

export const App: FC = () => {
    return <RouterProvider router={router} />
}
