import React from 'react'
import ReactDOM from 'react-dom/client'

import { onMounted, useReactive, useRef } from '../src'
import { Component as LifecycleCom } from './Lifecycle'
import { Component as RefCom } from './Ref'
import { Component as ShallowRefCom } from './ShallowRef'
import { Component as CustomRefCom } from './CustomRef'
import { Component as ReactiveCom } from './Reactive'
import { Component as ShallowReactiveCom } from './ShallowReactive'
import { Component as ComputedCom } from './Computed'
import { Component as ReactivityCom } from './Reactivity'
import { Component as WatchCom } from './Watch'
import { Component as EffectScopeCom } from './EffectScope'
import { Component as ReadonlyCom } from './Readonly'

import './style.css'

export const App: React.FC = () => {
  const lifecycleState = useRef(true)
  const toggleLifecycle = () => {
    lifecycleState.value = !lifecycleState.value
  }

  const logs = useReactive<string[]>([])
  const addNewLog = (log: string) => {
    console.log(log)
    logs.push(log)
  }

  onMounted(() => {
    addNewLog('App component mounted.')
  })

  const modules = [
    {
      title: 'Logs',
      element: (
        <ul className="log-list">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Lifecycle',
      element: (
        <>
          <button onClick={() => toggleLifecycle()}>toggle</button>
          {lifecycleState.value && <LifecycleCom onNewLog={addNewLog} />}
        </>
      ),
    },
    {
      title: 'Ref',
      element: <RefCom />,
    },
    {
      title: 'ShallowRef',
      element: <ShallowRefCom />,
    },
    {
      title: 'CustomRef',
      element: <CustomRefCom />,
    },
    {
      title: 'Reactive',
      element: <ReactiveCom />,
    },
    {
      title: 'ShallowReactive',
      element: <ShallowReactiveCom />,
    },
    {
      title: 'Computed',
      element: <ComputedCom />,
    },
    {
      title: 'Watch',
      element: <WatchCom />,
    },
    {
      title: 'EffectScope',
      element: <EffectScopeCom />,
    },
    {
      title: 'Readonly',
      element: <ReadonlyCom />,
    },
    {
      title: 'Reactivity',
      element: <ReactivityCom />,
    },
  ]

  return (
    <div className="app">
      {modules.map((m, i) => (
        <div className="module" key={i}>
          <h2 className="title">{m.title}</h2>
          <div className="element">{m.element}</div>
        </div>
      ))}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
