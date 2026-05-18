import { useState } from 'react'
import EffectDemo from './demos/EffectDemo'
import StateDemo from './demos/StateDemo'

type Tab = 'effect' | 'state'

export default function App() {
  const [tab, setTab] = useState<Tab>('effect')

  return (
    <div>
      <h1>React 演示</h1>
      <nav>
        <button onClick={() => setTab('effect')} disabled={tab === 'effect'}>
          useLayoutEffect vs useEffect
        </button>
        <button onClick={() => setTab('state')} disabled={tab === 'state'}>
          array & Object 更新
        </button>
      </nav>
      <hr />
      {tab === 'effect' ? <EffectDemo /> : <StateDemo />}
    </div>
  )
}
