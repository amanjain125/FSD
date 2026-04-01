import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar.jsx'
import Course from './Course.jsx'   
import Footer from './Footer.jsx'   

function App() {
  const [count, setCount] = useState(0)

  return (
    <><Navbar/><Course/><Footer/></>
  )
}

export default App