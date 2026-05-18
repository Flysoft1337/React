# React 演示 - 5.18

两个小演示：

- **useLayoutEffect vs useEffect** —— 对比执行时机，观察闪烁
- **array & Object 不可变更新** —— `push` / 直接改字段为什么不触发渲染

## 启动

```bash
npm install
npm run dev
```

## 目录

```
src/
  App.tsx              顶部 tab 切换
  demos/
    EffectDemo.tsx     两个 hook 的时机对比
    StateDemo.tsx      数组、对象的更新写法
```

## 要点

### useLayoutEffect vs useEffect

```
DOM 提交 → useLayoutEffect（同步）→ 浏览器绘制 → useEffect（异步）
```

`useEffect` 在绘制后才跑，如果在里面同步改 state，用户会先看到旧画面再看到新画面，可能闪烁。`useLayoutEffect` 在绘制前同步执行，没有这个问题。读 DOM 尺寸、做布局修正用 `useLayoutEffect`。

### array & Object

React 用 `Object.is` 比较新旧 state，引用没变就跳过渲染。

```ts
// 错：引用没变
list.push(x)
setList(list)

// 对：新数组
setList([...list, x])

// 嵌套对象要逐层展开
setUser({ ...user, addr: { ...user.addr, city: '上海' } })
```
