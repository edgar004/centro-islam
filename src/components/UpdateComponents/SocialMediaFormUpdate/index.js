import React, { useState } from "react";
import { Button, Col, Container, Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import "../../../views/examples/CSS/index.css";
import { connect } from "react-redux";
import { SOCIAL_MEDIA } from "redux/globalState";
import dotenv from "dotenv";
import { RESET_DATA_UPDATE } from "redux/globalState";
import { put } from "helpers/fetch";
import { Dialog } from "@mui/material";
import check from "images/check.png";
import warning from "images/warning.png";
dotenv.config();
const defaultValues = {
  instagram: "",
  facebook: "",
  correo: "",
};
function SocialMediaFormUpdate({
  getData,
  setOpen,
  state: {
    globalState: { dataUpdate },
  },
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm(defaultValues);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);

  const onSubmitUpdate = (data) => {
    // eslint-disable-next-line
    Object.entries(data).map((i) => {
      put("/red", {
        descripcion: i[0],
        url: i[1],
        id: dataUpdate[0]._id,
      }).then((res) => {
        setStatus(res.status);
        switch (res.status) {
          case 200:
          case 201:
            setMessage("Esta red fue actualizado de forma exitosa");
            setTimeout(() => {
              setOpen(false);
              getData();
            }, 1500);
            return res.json();
          default:
            setMessage("");
        }
      });
    });
  };
  return (
    <>
      <div className="section section-contact-us container-bhb">
        <Container>
          <Col className=" ml-auto mr-auto" style={{ padding: "30px" }}>
            <h4
              className="title text-center"
              style={{ color: "#6e818e", marginBottom: "8%" }}
            >
              Actualizando configuración de los links de las redes sociales
            </h4>
            <form onSubmit={handleSubmit((data) => onSubmitUpdate(data))}>
              {dataUpdate["0"] &&
              dataUpdate["0"].descripcion === "instagram" ? (
                <>
                  <Controller
                    name="instagram"
                    control={control}
                    defaultValue={dataUpdate["0"].url}
                    rules={{
                      required: "Este campo es requerido",
                      pattern: {
                        value:
                          /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
                        message: "Este campo solo permite url",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        className="centro"
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
                </>
              ) : dataUpdate["0"].descripcion === "facebook" ? (
                <>
                  <Controller
                    name="facebook"
                    control={control}
                    defaultValue={dataUpdate["0"].url}
                    rules={{
                      required: "Este campo es requerido",
                      pattern: {
                        value:
                          /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
                        message: "Este campo solo permite url",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        className="centro"
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
                </>
              ) : (
                <>
                  <Controller
                    name="correo"
                    control={control}
                    defaultValue={dataUpdate["0"].url}
                    rules={{
                      required: "Este campo es requerido",
                      pattern: {
                        value:
                          /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
                        message: "Este campo solo permite url",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        className="centro"
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
                </>
              )}
              {status !== 0 && (
                <Dialog maxWidth={"md"} open={Boolean(message)}>
                  <div
                    style={{
                      padding: "3%",
                      textAlign: "center",
                      fontSize: "18px",
                      backgroundColor:
                        status === 200 || status === 201
                          ? "#FFFFFF"
                          : "#F7EF3B",
                    }}
                  >
                    <img
                      src={status === 200 || status === 201 ? check : warning}
                      width={"30%"}
                      alt={"status"}
                    />
                    <h1
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        padding: "2%",
                      }}
                    >
                      {status === 200 || status === 201
                        ? message
                        : "Ha ocurrido un error intente más tarde"}
                    </h1>
                  </div>
                </Dialog>
              )}
              <div className="send-button">
                <Button
                  disabled={Boolean(
                    (errors.correo && errors.correo.message) ||
                      (errors.instagram && errors.instagram.message) ||
                      (errors.facebook && errors.facebook.message)
                  )}
                  block
                  className="btn-round"
                  color="info"
                  type="submit"
                  size="lg"
                >
                  Actualizar link
                </Button>
              </div>
            </form>
          </Col>
          <Col
            className="text-center"
            style={{ position: "float", padding: "em" }}
          ></Col>
        </Container>
      </div>
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
    addSocialMediaDataUpdate: (data) =>
      dispatch({
        type: RESET_DATA_UPDATE,
        payload: {
          data,
        },
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialMediaFormUpdate);
