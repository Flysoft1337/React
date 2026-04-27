import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

interface RouteLog {
  from: string
  to: string
  time: string
}

// 路由动态监听：watch 路由变化，记录每次跳转的 from -> to
export default function RouteListener() {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const [logs, setLogs] = useState<RouteLog[]>([])

  useEffect(() => {
    const from = prevPath.current
    const to = location.pathname

    // 路径没变就不记录
    if (from === to) return

    const time = new Date().toLocaleTimeString()
    console.log(`[路由监听] ${time}  ${from} → ${to}`)

    setLogs(prev => [...prev, { from, to, time }])
    prevPath.current = to
  }, [location])

  const token = localStorage.getItem('token')

  return (
    <div style={{ marginTop: 40, padding: '8px 0', borderTop: '1px solid #ccc', fontSize: 13 }}>
      <div style={{ color: '#888', marginBottom: 6 }}>
        当前路径：{location.pathname}
      </div>
      <div style={{ color: '#888', marginBottom: 6 }}>
        Token：{token}
      </div>
      {logs.length > 0 && (
        <details open>
          <summary style={{ cursor: 'pointer', color: '#666' }}>
            路由记录（{logs.length} 条）
          </summary>
          <ul style={{ margin: '6px 0', paddingLeft: 20, color: '#888' }}>
            {logs.map((log, i) => (
              <li key={i}>
                <span style={{ color: '#aaa' }}>[{log.time}]</span>{' '}
                {log.from} → {log.to}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
