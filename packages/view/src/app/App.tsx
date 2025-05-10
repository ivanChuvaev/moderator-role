import { FC } from 'react'
import { createBrowserRouter, replace, RouterProvider } from 'react-router-dom'

import { ProductPage } from '@view/pages/ProductPage'
import { ProductsPage } from '@view/pages/ProductsPage'
import { GlobalLayout } from '@view/layouts/GlobalLayout/GlobalLayout'
import { ModeratorsPage } from '@view/pages/ModeratorsPage'
import { ChatPage, ChatPageChat } from '@view/pages/ChatPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <GlobalLayout />,
        children: [
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
                path: '/chat',
                element: <ChatPage />,
                children: [
                    {
                        path: '',
                        element: <ChatPageChat />,
                    },
                    {
                        path: ':productId',
                        element: <ChatPageChat />,
                    },
                ],
            },
        ],
    },
])

export const App: FC = () => {
    return <RouterProvider router={router} />
}
