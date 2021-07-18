import React from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { CineplexChart } from "../../components/admin/chart/cineplexChart";
import { MovieChart } from "../../components/admin/chart/movieChart";
function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Booking revenue by Cineplex</Card.Title>
              </Card.Header>
              <Card.Body>
              <CineplexChart/>
              </Card.Body>
              {/* <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Tesla Model S <i className="fas fa-circle text-danger"></i>
                  BMW 5 Series
                </div>
              </Card.Footer> */}
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Booking revenue by Movie</Card.Title>
              </Card.Header>
              <Card.Body>
              <MovieChart/>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
