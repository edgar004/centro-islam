import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Input, Spinner } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import TableCRUD from "components/TableCRUD";
import "../../views/examples/CSS/index.css";
import { connect } from "react-redux";
import { SOCIAL_MEDIA } from "redux/globalState";
import SocialMediaFormUpdate from "components/UpdateComponents/SocialMediaFormUpdate";
import dotenv from "dotenv";
import DialogModal from "components/DialogModal";
import MessageModal from "components/MessageModal";
import { post, get } from "helpers/fetch";
dotenv.config();

const resetField = {
  correo: "",
  instagram: "",
  facebook: "",
};
function SocialMediaForm({ addSocialMediaData }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [dataGet, setDataGet] = useState({});
  const [status, setStatus] = useState();
  const [messageSuccess, setMessageSuccess] = useState("");
  const [delFt, setDel] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputMailDisabled, setInputMailDisabled] = useState(false);
  const [inputFacebookDisabled, setInputFacebookDisabled] = useState(false);
  const [inputInstagramDisabled, setInputInstagramDisabled] = useState(false);
  const [valueRed, setValueRed] = useState([]);
  const arrRed = [];

  const getData = () => {
    get("/red")
      .then((e) => e.json())
      .then(({ data }) => setDataGet(data));
  };
  const inputDisabled = (data) => {
    data.length >= 0 &&
    // eslint-disable-next-line
      data.map(({ descripcion }) => {
        const descriptionArr = [];
        descriptionArr.push(descripcion);
        // eslint-disable-next-line
        descriptionArr.find((red) => {
          switch (red) {
            case "correo":
              setInputMailDisabled(true);
              break;
            case "instagram":
              setInputInstagramDisabled(true);
              break;
            case "facebook":
              setInputFacebookDisabled(true);
              break;
            default:
              setInputMailDisabled(false);
              setInputFacebookDisabled(false);
              setInputInstagramDisabled(false);
          }
        });
      });
  };

  useEffect(() => {
    getData();
  }, [delFt]);
  useEffect(() => {
    inputDisabled(dataGet);
    addSocialMediaData(dataGet);
    //eslint-disable-next-line
  }, [dataGet, delFt]);

  const onSubmitSave = (data) => {
    setStatus(0);
    // eslint-disable-next-line
    Object.entries(data).map((i) => {
      post("/red", {
        descripcion: i[0],
        url: i[1],
      }).then((res) => {
        setStatus(res.status);
        if (res.status === 201 || res.status === 200) {
          setMessageSuccess("Se han agregado de forma correcta");
        }
        getData();
        return res.json();
      });

      setTimeout(() => setMessageSuccess(""), 2000);
      setTimeout(() => setStatus(), 2000);
    });
  };

  return (
    <>
      {!open ? (
        <div className="section section-contact-us container-bhb">
          <Container>
            <Col className=" ml-auto mr-auto" style={{ padding: "30px" }}>
              <h4
                className="title text-center"
                style={{ color: "#6e818e", marginBottom: "8%" }}
              >
                Configuración de los links de las redes sociales
              </h4>
              <form
                onChange={(e) => {
                  if (e.target.name) {
                    if (e.target.value) {
                      arrRed.push({ [e.target.name]: [e.target.value] });
                    } else {
                      arrRed.pop({ [e.target.name]: [e.target.value] });
                    }
                  }
                  setValueRed(arrRed);
                }}
                onSubmit={handleSubmit((data) => {
                  onSubmitSave(data);
                  getData();
                  reset(resetField);
                })}
              >
                <Controller
                  name="instagram"
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
                      message: "Este campo solo permite url",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      className="centro"
                      disabled={inputInstagramDisabled}
                      style={{
                        height: "5em",
                        marginBottom: "4px",
                        fontSize: "14px",
                        padding: "20px",
                      }}
                      placeholder="Pegue el link del instagram del centro"
                      {...field}
                    />
                  )}
                />
                {errors.instagram && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "13px",
                      fontWeight: 400,
                      paddingLeft: "4%",
                    }}
                  >
                    {errors.instagram.message}
                  </p>
                )}
                <Controller
                  name="facebook"
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
                      message: "Este campo solo permite url",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      className="centro"
                      disabled={inputFacebookDisabled}
                      style={{
                        height: "5em",
                        marginBottom: "4px",
                        fontSize: "14px",
                        padding: "20px",
                      }}
                      placeholder="Pegue el link del facebook del centro"
                      {...field}
                    />
                  )}
                />
                {errors.facebook && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "13px",
                      fontWeight: 400,
                      paddingLeft: "4%",
                    }}
                  >
                    {errors.facebook.message}
                  </p>
                )}
                <Controller
                  name="correo"
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
                      message: "Este campo solo permite url",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      className="centro"
                      disabled={inputMailDisabled}
                      style={{
                        height: "5em",
                        marginBottom: "4px",
                        fontSize: "14px",
                        padding: "20px",
                      }}
                      placeholder="Pegue el link del correo del centro"
                      {...field}
                    />
                  )}
                />
                {errors.correo && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "13px",
                      fontWeight: 400,
                      paddingLeft: "4%",
                    }}
                  >
                    {errors.correo.message}
                  </p>
                )}

                {status === 0 ? (
                  <Spinner
                    style={{
                      display: "block",
                      margin: "auto",
                      marginBottom: "4%",
                    }}
                  ></Spinner>
                ) : (
                  <Alert
                    style={{ borderRadius: "2em" }}
                    color={
                      status === 200 || status === 201
                        ? "success"
                        : status !== 500 && status !== 0
                        ? ""
                        : "danger"
                    }
                  >
                    {status === 201 ? messageSuccess : ""}
                  </Alert>
                )}
                <div className="send-button">
                  <Button
                    disabled={!Boolean(valueRed[0])}
                    block
                    className="btn-round"
                    color="info"
                    type="submit"
                    size="lg"
                  >
                    Agregar links
                  </Button>
                </div>
                <MessageModal
                  message={messageSuccess}
                  open={open}
                  setOpen={setOpen}
                />
              </form>
            </Col>
            <Col
              className="text-center"
              style={{ position: "float", padding: "em" }}
            >
              <TableCRUD
                dataGet={dataGet || []}
                setOpen={setOpen}
                open={open}
                url={"/red"}
                getData={getData}
                inputDisabled={inputDisabled}
                delFt={delFt}
                setDel={setDel}
                setInputMailDisabled={setInputMailDisabled}
                setInputFacebookDisabled={setInputFacebookDisabled}
                setInputInstagramDisabled={setInputInstagramDisabled}
              />
            </Col>
          </Container>
        </div>
      ) : (
        <DialogModal
          component={
            <SocialMediaFormUpdate getData={getData} setOpen={setOpen} />
          }
          setOpen={setOpen}
          open={open}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addSocialMediaData: (data) =>
      dispatch({
        type: SOCIAL_MEDIA,
        payload: {
          data,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaForm);
