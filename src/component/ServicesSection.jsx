import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/services.css";
import capsuleImg from "../assets/memoriesCapsules.png";
import letterImg from "../assets/letteroffuture.png";
import bucketListImg from "../assets/bucketlist.png";
import achievementsImg from "../assets/achievements.png";g
import goalsImg from "../assets/yearlygoals.png";

const services = [
  {
    title: "Memories Capsule",
    description: "Store your precious memories in a secure time capsule.",
    img: capsuleImg,
  },
  {
    title: "Letter to Future Self",
    description: "Write a letter to your future self and open it later.",
    img: letterImg,
  },
  {
    title: "Bucket List",
    description: "Keep track of your dreams and tick them off as you achieve them.",
    img: bucketListImg,
  },
  {
    title: "Achievements",
    description: "Record your milestones and celebrate your achievements.",
    img: achievementsImg,
  },
  {
    title: "Yearly Goals",
    description: "Set and track your goals for the upcoming year.",
    img: goalsImg,
  },
];

const AboutUsSection = () => {
  return (
    <Container id ="services" fluid className="py-5 w-100">

      <h2 className="text-center mb-4">Our Services</h2>
      <Row>
        {services.map((service, index) => (
          <Col key={index} lg={4} md={6} sm={12} className="mb-4">
            <Card className="h-100 shadow-lg">
              <Card.Img variant="top" src={service.img} alt={service.title} />
              <Card.Body className="text-center">
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutUsSection;
