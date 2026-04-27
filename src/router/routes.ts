import type { RouteObject } from 'react-router'
import Layout from '../pages/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import DashboardHome from '../pages/DashboardHome'
import DashboardSettings from '../pages/DashboardSettings'
import User from '../pages/User'
import UserProfile from '../pages/UserProfile'
import UserAccount from '../pages/UserAccount'
import AuthGuard from '../components/AuthGuard'

// 集中管理所有路由配置
const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      {
        path: 'dashboard',
        Component: AuthGuard, // 访问 dashboard 下的页面都要先过守卫
        children: [
          {
            Component: Dashboard, // 没有 path，纯布局用
            children: [
              { index: true, Component: DashboardHome },
              { path: 'settings', Component: DashboardSettings },
            ],
          },
        ],
      },
      {
        path: 'user',
        Component: AuthGuard, // 用户中心也要登录
        children: [
          {
            Component: User,
            children: [
              { index: true, Component: UserProfile },
              { path: 'account', Component: UserAccount },
            ],
          },
        ],
      },
    ],
  },
]

export default routes
