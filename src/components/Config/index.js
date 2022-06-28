import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

function ConfigCard({ activities }) {
  return (
    <>
      <h2 className="title text-center">Actividades</h2>
      <Col md="5">
        <Row>
          {activities.map((i) => {
            return(
              <Card style={{ margin: "20px" }}>
                <CardBody>
                  <img src={i} alt={""} />
                </CardBody>
              </Card>
            )
          })}
        </Row>
      </Col>
    </>
  );
}
export default ConfigCard;
