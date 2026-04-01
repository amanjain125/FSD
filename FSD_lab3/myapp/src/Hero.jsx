import React from 'react'
import { Container, Badge } from 'react-bootstrap'

function Hero() {
  return (
    <section id="hero" className="py-5 text-center bg-light">
      <Container>
        <h1 className="display-4">Hello, I'm Manthan</h1>
        <p className="lead">A passionate Full Stack Developer</p>
        <Badge bg="primary">Open to Opportunities</Badge>
      </Container>
    </section>
  )
}

export default Hero