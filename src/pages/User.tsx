import { Link, Outlet } from 'react-router'

// 用户中心布局，挂二级路由
export default function User() {
  return (
    <div>
      <h2>用户中心</h2>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="/user">个人资料</Link>
        <Link to="/user/account">账号设置</Link>
      </nav>
      <Outlet />
    </div>
  )
}
