import { Navigate, Outlet, useLocation } from 'react-router'

// 路由守卫：游客 token 不让进，只有登录后的用户 token 才放行
export default function AuthGuard() {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (!token || token.startsWith('guest_')) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
