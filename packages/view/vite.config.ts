/* eslint-disable import/order */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@model': path.resolve(__dirname, '../model/src'),
            '@view': path.resolve(__dirname, './src'),
        },
    },
})
