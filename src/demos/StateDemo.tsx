import { useState } from 'react'

// 演示数组和对象在 useState 里必须用新引用才会触发更新
// push / 直接改字段 不会重新渲染，因为 React 用 Object.is 比较，引用没变就跳过
export default function StateDemo() {
  return (
    <div>
      <h2>array & Object 的不可变更新</h2>
      <ArrayDemo />
      <hr />
      <ObjectDemo />
    </div>
  )
}

function ArrayDemo() {
  const [list, setList] = useState<number[]>([1, 2, 3])

  // 错误示范：原地 push，引用没变，不触发渲染
  const wrongPush = () => {
    list.push(list.length + 1)
    setList(list)
  }

  // 正确：返回新数组
  const rightPush = () => {
    setList([...list, list.length + 1])
  }

  const remove = (i: number) => {
    setList(list.filter((_, idx) => idx !== i))
  }

  const update = (i: number) => {
    setList(list.map((n, idx) => idx === i ? n * 10 : n))
  }

  return (
    <div>
      <h3>数组</h3>
      <p>list = {JSON.stringify(list)}</p>
      <button onClick={wrongPush}>错误：list.push</button>
      <button onClick={rightPush}>正确：[...list, x]</button>
      <button onClick={() => remove(0)}>删第一个</button>
      <button onClick={() => update(0)}>第一个 ×10</button>
    </div>
  )
}

function ObjectDemo() {
  const [user, setUser] = useState({ name: '小明', age: 18, addr: { city: '北京' } })

  // 错误示范：直接改字段
  const wrongEdit = () => {
    user.age++
    setUser(user)
  }

  // 正确：展开成新对象
  const rightEdit = () => {
    setUser({ ...user, age: user.age + 1 })
  }

  // 嵌套对象也要逐层展开，否则内层引用没变
  const editCity = () => {
    setUser({ ...user, addr: { ...user.addr, city: user.addr.city === '北京' ? '上海' : '北京' } })
  }

  return (
    <div>
      <h3>对象</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={wrongEdit}>错误：user.age++</button>
      <button onClick={rightEdit}>正确：&#123;...user, age+1&#125;</button>
      <button onClick={editCity}>切换城市（嵌套）</button>
    </div>
  )
}
