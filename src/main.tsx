import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import routes from './router/routes'

// 进入页面时先生成一个游客 token
if (!localStorage.getItem('token')) {
  localStorage.setItem('token', 'guest_' + Date.now())
}

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
