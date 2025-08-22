import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TriangleAreaLearning from './pages/TriangleAreaLearning'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TriangleAreaLearning />

    </>
  )
}

export default App
