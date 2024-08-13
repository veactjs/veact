import { useRef as useReactRef } from 'react'

export const useRenderCount = () => {
  const renderCount = useReactRef(0)
  renderCount.current++
  return renderCount.current
}
