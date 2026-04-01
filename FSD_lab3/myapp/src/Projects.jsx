import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

function Projects() {
  const projectList = [
    { title: 'Portfolio Website', img: 'https://via.placeholder.com/300', desc: 'Responsive React Bootstrap portfolio.' },
    { title: 'Task Manager', img: 'https://via.placeholder.com/300', desc: 'React + Express task management app.' },
    { title: 'AR Demo', img: 'https://via.placeholder.com/300', desc: 'Basic AR scene using A-Frame.' },
  ]

  return (
    <section id="projects" className="py-5">
      <Container>
        <h2 className="text-center mb-4">My Projects</h2>
        <Row>
          {projectList.map((p, idx) => (
            <Col key={idx} lg={4} md={6} sm={12} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={p.img} />
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>{p.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Projects