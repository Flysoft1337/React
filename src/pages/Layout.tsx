import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import RouteListener from '../components/RouteListener'

// 全局布局：顶部导航 + 页面内容 + 路由监听
export default function Layout() {
  useLocation()
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  const handleLogout = () => {
    // 登出后换回游客 token
    localStorage.setItem('token', 'guest_' + Date.now())
    localStorage.removeItem('username')
    navigate('/', { replace: true })
  }

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <Link to="/">首页</Link>
        <Link to="/dashboard">仪表盘</Link>
        <Link to="/user">用户中心</Link>
        {username
          ? <span>{username}（<a style={{ cursor: 'pointer' }} onClick={handleLogout}>登出</a>）</span>
          : <Link to="/login">登录</Link>
        }
      </nav>
      <hr />
      <Outlet />
      <RouteListener />
    </div>
  )
}
