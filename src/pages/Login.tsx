import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const from = (location.state as { from?: string })?.from || '/dashboard'

  const handleLogin = async () => {
    if (!username || !password) return
    // 用 SHA-256 哈希(用户名:密码) 生成 token，不可逆
    const data = new TextEncoder().encode(username + ':' + password)
    const hash = await crypto.subtle.digest('SHA-256', data)
    const token = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    navigate(from, { replace: true })
  }

  return (
    <div>
      <h2>登录页</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 240 }}>
        <input
          placeholder="用户名"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="密码"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>登录</button>
      </div>
    </div>
  )
}
