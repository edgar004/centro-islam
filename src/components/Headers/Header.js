import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import img from "../../assets/img/bg1.jpg";
function Header({ name, socialMedia, logo }) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  const arrSocialMedia = Array.from(socialMedia);

  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              logo === "" ? "url(" + img + ")" : "url(" + logo + ")",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">{name}</h1>
            <div className="text-center">
              {arrSocialMedia.map(({ descripcion, url }) => (
                <Button className="btn-icon btn-round" color="info" href={url}>
                  <i
                    className={
                      descripcion === "facebook"
                        ? "fab fa-facebook-square"
                        : descripcion === "instagram"
                        ? "fab fa-instagram"
                        : "fab fa-google-plus"
                    }
                  ></i>
                </Button>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Header;
