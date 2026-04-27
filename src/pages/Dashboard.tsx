import { Link, Outlet } from 'react-router'

// 仪表盘布局，包含子导航和二级路由出口
export default function Dashboard() {
  return (
    <div>
      <h2>仪表盘</h2>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="/dashboard">概览</Link>
        <Link to="/dashboard/settings">设置</Link>
      </nav>
      {/* 二级路由渲染在这里 */}
      <Outlet />
    </div>
  )
}
