import React, { useEffect } from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// core components
import Header from "components/Headers/Header";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import Carousel from "views/index-sections/Carousel.js";
import { connect } from "react-redux";
import CarouselSectionOption from "views/index-sections/Other-option/Carousel-Option";
import { HOME } from "redux/globalState";

function Home({ addConfigurationData, socialMedia, config, owner }) {
  useEffect((e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    addConfigurationData(config);
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
    // eslint-disable-next-line
  }, []);
  const getDescriptionWithSpace = (text) => {
    const textSplit = text.split("\n");
    return textSplit;
  };

  return (
    <>
      <div className="wrapper">
        <Header
          socialMedia={socialMedia}
          name={(config[0] && config[0].nombre) || "Nombre del centro"}
          logo={(config[0] && config[0].logo) || ""}
        />
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h3 className="title">
                  {(config[0] && config[0].tituloDescripcion) || "Titulo"}
                </h3>
              </Col>
              <Col
                className="ml-auto mr-auto "
                md="8"
                style={{ textAlign: "justify" }}
              >
                {config[0] &&
                  config[0].descripcion &&
                  getDescriptionWithSpace(config[0].descripcion).map((i) => (
                    <p>
                      {i}
                      <br />
                    </p>
                  ))}
              </Col>
            </Row>
            {!config[0] ? (
              <CarouselSectionOption />
            ) : (
              <Carousel imgs={(config[0] && config[0].imagenes) || []} />
            )}
            <div className="col text-center">
              <Button
                className="btn-round btn-white"
                color="default"
                to="/actividades"
                outline
                size="lg"
                tag={Link}
              >
                Ver más
              </Button>
            </div>
            <div className="separator separator-primary"></div>
          </Container>
        </div>
        <div className="section section-team text-center">
          <Container>
            <h2 className="title" style={{ padding: "2em" }}>
              Personal de apoyo
            </h2>
            <div className="team">
              <Row>
                {owner &&
                  owner.map(({ nombre, descripcion, redes, avatar }, i) => (
                    <Col md="4" style={{ paddingBottom: "10%" }}>
                      <div className="team-player">
                        <img
                          alt="..."
                          style={{ height: "7em" }}
                          className="rounded-circle img-fluid img-raised"
                          src={avatar}
                        ></img>
                        <h4 className="title">{nombre}</h4>
                        <p className="description">{descripcion}</p>
                        {Object.keys(redes[0]).map((red, e) => (
                          <Button
                            className="btn-icon btn-round"
                            color="info"
                            href={Object.values(redes[0])[e]}
                          >
                            <i
                              className={
                                red === "facebook"
                                  ? "fab fa-facebook-square"
                                  : red === "instagram"
                                  ? "fab fa-instagram"
                                  : "fab fa-google-plus"
                              }
                            ></i>
                          </Button>
                        ))}
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addConfigurationData: (data) =>
      dispatch({
        type: HOME,
        payload: {
          data,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
