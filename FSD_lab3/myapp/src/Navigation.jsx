import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">My Portfolio</Navbar.Brand>
        <Nav className="me-auto flex-row gap-3">
          <Nav.Link href="#hero">Home</Nav.Link>
          <Nav.Link href="#projects">Projects</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation