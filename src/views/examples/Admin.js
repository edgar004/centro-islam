import React from "react";

// reactstrap components
import { Button, Container, Row, Col, Badge } from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import { connect } from "react-redux";

import { RESET_DATA_UPDATE } from "redux/globalState";
import { Link } from "react-router-dom";

function Admin({ socialMedia }) {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar socialMedia={socialMedia} />
      <div className="wrapper">
        <div className="page-header page-header-small-xs" />
        <div className="section section-about-us">
          <Col>
            <h1
              className="ml-auto mr-auto text-center"
              style={{ padding: "15%" }}
            >
              Registrando información de las vistas
            </h1>
          </Col>
          <hr />
          <h2 className="description text-center" style={{ padding: "10%" }}>
            <Badge color="primary"> </Badge>
            <Col className="ml-auto mr-auto text-center">
              <h7 className="description">
                Como administrador podra agregar información que se mostrará en
                las vistas de la página.
              </h7>
            </Col>
            <Badge color="primary"> </Badge>
          </h2>
          <Container>
            <Row>
              <div style={{ width: "100%" }}>
                <Button
                  block
                  className="btn-round"
                  color="info"
                  type="submit"
                  size="lg"
                  to="/configuracion-form"
                  tag={Link}
                  style={{ width: "50%", margin: "auto", marginBottom: "1%" }}
                >
                  <h4>Inicio</h4>
                </Button>

                <Button
                  block
                  className="btn-round"
                  color="info"
                  type="submit"
                  size="lg"
                  to="/actividades-form"
                  tag={Link}
                  style={{ width: "50%", margin: "auto", marginBottom: "1%" }}
                >
                  <h4>Actividades</h4>
                </Button>
                <Button
                  block
                  className="btn-round"
                  color="info"
                  type="submit"
                  size="lg"
                  to="/redes-form"
                  tag={Link}
                  style={{ width: "50%", margin: "auto", marginBottom: "1%" }}
                >
                  <h4>Redes Sociales</h4>
                </Button>
                <Button
                  block
                  className="btn-round"
                  color="info"
                  type="submit"
                  size="lg"
                  to="/perfiles-form"
                  tag={Link}
                  style={{ width: "50%", margin: "auto", marginBottom: "1%" }}
                >
                  <h4>Perfiles</h4>
                </Button>
                <Button
                  block
                  className="btn-round"
                  color="info"
                  type="submit"
                  size="lg"
                  to="/eventos-form"
                  tag={Link}
                  style={{ width: "50%", margin: "auto", marginBottom: "5%" }}
                >
                  <h4>Agenda de eventos</h4>
                </Button>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addSocialMediaDataUpdate: (data) =>
      dispatch({
        type: RESET_DATA_UPDATE,
        payload: {
          data,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
