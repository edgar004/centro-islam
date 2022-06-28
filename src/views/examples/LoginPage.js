import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Alert,
} from "reactstrap";

import { Nav, NavItem, NavLink } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
// core components
import TransparentFooter from "components/Footers/TransparentFooter.js";
import { Controller, useForm } from "react-hook-form";
import { post } from "helpers/fetch";
import { LOGIN } from "redux/globalState";
import { connect } from "react-redux";

function LoginPage({ login }) {
  //eslint-disable-next-line
  const [data, setData] = useState({});
  const { handleSubmit, control } = useForm();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const history = useHistory();

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  const onSubmitSave = async (data) => {
    setData(data);
    await post("/auth/login", data)
      .then((res) => {
        console.log(res);
        setStatus(res.status);
        switch (res.status) {
          case 200:
            setMessage("Este usuario fue creado de forma exitosa");
            setTimeout(() => history.push("/inicio"), 1500);
            return res.json();
          case 401:
          case 400:
            setMessage("Credenciales inválidas");
            break;
          default:
            setMessage("");
        }
      })
      .then(({ token, login: loginValue }) => {
        localStorage.setItem("Islam_auth_token", token);
        login(loginValue);
      });
      window.location.reload()
  };

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div className="page-header-image"></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <form
                  onSubmit={handleSubmit((data) => {
                    onSubmitSave(data);
                  })}
                  className="form"
                >
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/programador.png").default}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Controller
                      name="user"
                      control={control}
                      render={({ field }) => (
                        <>
                          <InputGroup className={"no-border input-lg"}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Usuario"
                              type="text"
                              {...field}
                            ></Input>
                          </InputGroup>
                        </>
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <>
                          <InputGroup className={"no-border input-lg"}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Contraseña"
                              {...field}
                              type="password"
                            ></Input>
                          </InputGroup>
                        </>
                      )}
                    />
                  </CardBody>
                  {message && (
                    <Alert
                      style={{ borderRadius: "2em" }}
                      color={status === 200 ? "success" : "danger"}
                    >
                      {message}
                    </Alert>
                  )}
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                      size="lg"
                    >
                      Iniciar Sesión
                    </Button>
                    <div className="pull-right">
                      <h6>
                        <Nav navbar>
                          <NavItem>
                            <NavLink to="/inicio" tag={Link}>
                              Volver a Inicio
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </h6>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) =>
      dispatch({
        type: LOGIN,
        payload: {
          data,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
