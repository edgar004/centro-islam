import React from "react";
import { Col, Row, TabPane } from "reactstrap";

function Gallery({ open }) {
  return (
    <>
      {open && (
        <TabPane tabId="pills1">
          <Col className="ml-auto mr-auto" md="10">
            <Row className="collections">
              <Col md="12">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/bg3.jpg").default}
                ></img>
              </Col>
              <Col md="12">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/bg7.jpg").default}
                ></img>
              </Col>
            </Row>
          </Col>
        </TabPane>
      )}
    </>
  );
}
export default Gallery;
