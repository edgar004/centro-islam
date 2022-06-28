import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import { LOGOUT } from "redux/globalState";
const token = localStorage.getItem("Islam_auth_token") || {};

function ExamplesNavbar({
  socialMedia,
  logout,
  state: {
    globalState: { isUserLoggedIn },
  },
}) {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [displayIcon, setDisplayIcon] = useState(false);
  React.useEffect(() => {
    const displayIcon = () => {
      if (document.documentElement.offsetWidth < 992) {
        setDisplayIcon(true);
      } else {
        setDisplayIcon(false);
      }
    };
    displayIcon();
  }, []);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  const removeToken = () => {
    logout();
  };
  const arrSocialMedia = Array.from(socialMedia);
  function isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
        <Container>
          {displayIcon && (
            <>
              <UncontrolledDropdown className="button-dropdown">
                <DropdownToggle
                  caret
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdown"
                  tag="a"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="button-bar"></span>
                  <span className="button-bar"></span>
                  <span className="button-bar"></span>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdown">
                  <DropdownItem header tag="a">
                    Dropdown header
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>
                  <DropdownItem divider></DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Separated link
                  </DropdownItem>
                  <DropdownItem divider></DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    One more separated link
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <div className="navbar-translate">
                <button
                  className="navbar-toggler navbar-toggler"
                  onClick={() => {
                    document.documentElement.classList.toggle("nav-open");
                    setCollapseOpen(!collapseOpen);
                  }}
                  aria-expanded={collapseOpen}
                  type="button"
                >
                  <span className="navbar-toggler-bar top-bar"></span>
                  <span className="navbar-toggler-bar middle-bar"></span>
                  <span className="navbar-toggler-bar bottom-bar"></span>
                </button>
              </div>
            </>
          )}
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink to="/inicio" tag={Link}>
                  Inicio
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/actividades" tag={Link}>
                  Actividades
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/agenda" tag={Link}>
                  Agenda
                </NavLink>
              </NavItem>
              {!isObjEmpty(token) ? (
                <>
                  <NavItem>
                    <NavLink to="/admin" tag={Link}>
                      Admin
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={removeToken}
                      style={{ cursor: "pointer" }}
                    >
                      logout
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <NavLink to="/login" tag={Link}>
                    Login
                  </NavLink>
                </NavItem>
              )}
              {arrSocialMedia.map(({ descripcion, url }) => (
                <NavItem>
                  <NavLink href={url} target="_blank" id="google-plus-tooltip">
                    <i
                      className={
                        descripcion === "facebook"
                          ? "fab fa-facebook-square"
                          : descripcion === "instagram"
                          ? "fab fa-instagram"
                          : "fab fa-google-plus"
                      }
                    ></i>
                    <p className="d-lg-none d-xl-none">{descripcion}</p>
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: LOGOUT,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamplesNavbar);
