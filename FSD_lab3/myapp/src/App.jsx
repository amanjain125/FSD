import React, { useEffect } from 'react'
import Navigation from './Navigation.jsx'
import Hero from './Hero.jsx'
import Projects from './Projects.jsx'
import Contact from './Contact.jsx'

function App() {
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .card:hover {
        transform: translateY(-5px);
        transition: 0.3s ease-in-out;
      }
    `
    document.head.appendChild(style)
  }, [])

  return (
    <>
      <Navigation />
      <Hero />
      <Projects />
      <Contact />
    </>
  )
}

export default App