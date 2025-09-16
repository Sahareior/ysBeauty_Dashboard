import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import YsDashboard from './components/YsDashboard'
import Login from './components/page/auth/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
<div>
  <Login />
</div>
  )
}

export default App
