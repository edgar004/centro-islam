import React from "react";
import {
  Badge,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Carousel from "../../views/index-sections/Carousel";

function EventCard({ activities }) {
  const actArr = Array.from(activities);

  const getDescriptionWithSpace = (text) => {
    const textSplit = text.split("\n");
    return textSplit;
  };
  return (
    <>
      <h2
        className="title text-center"
        style={{ paddingTop: "10%", paddingBottom: "10%" }}
      >
        <Badge color="primary"> </Badge> Actividades Realizadas{" "}
        <Badge color="primary"> </Badge>
      </h2>
      <Row>
        {actArr.map(({ nombre, descripcion, imagenes }) => (
          <Col sm="6" style={{ padding: "5%" }}>
            <Carousel imgs={imagenes} />
            <CardBody>
              <CardTitle tag="h4">{nombre}</CardTitle>
              {getDescriptionWithSpace(descripcion).map((text) => (
                <CardText>{text}</CardText>
              ))}
            </CardBody>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default EventCard;
