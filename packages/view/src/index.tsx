import React from 'react'
import { createRoot } from 'react-dom/client'

import 'normalize.css'
import './index.scss'
import '@moderator-role/web-components'
import { App } from './app/App'
import { game } from './game'

game.start()

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
