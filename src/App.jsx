import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import YsDashboard from './components/YsDashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
<div>
  <YsDashboard />
</div>
  )
}

export default App
