import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import ContentRepo from './ContentRepo'

const root = ReactDOM.createRoot(document.getElementById('root'))
const contentRepo = new ContentRepo()
root.render(
    <React.StrictMode>
        <App contentRepo={contentRepo}/>
    </React.StrictMode>
)
