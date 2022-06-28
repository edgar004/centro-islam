import React, { useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { ACTIVITIES } from "redux/globalState";
import { put } from "helpers/fetch";
import ImageSelector from "components/ImagesSelector";
import { uploadFiles } from "helpers/uploadFiles";
import check from "images/check.png";
import warning from "images/warning.png";
import { Dialog } from "@mui/material";

function ActivitiesForm({
  setOpen,
  getData,
  state: {
    globalState: { dataUpdate },
  },
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);
  const [messageErrFiles, setMessageErrFiles] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [images, setImages] = useState(dataUpdate["0"].imagenes);

  //eslint-disable-next-line

  const onSubmitUpdate = async (data) => {
    const url = await uploadFiles(files);
    Object.assign(data, {
      imagenes: [...dataUpdate[0].imagenes, ...url],
      id: dataUpdate[0]._id,
    });
    put("/actividad", data).then((res) => {
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

  };

  return (
    <>
      <div className="section-contact-us">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto">
              <h4
                className="title text-center"
                style={{ color: "#6e818e", marginBottom: "8%" }}
              >
                Configuración de la vista de "Actividades"
              </h4>
              <form onSubmit={handleSubmit((data) => onSubmitUpdate(data))}>
                {dataUpdate["0"] && dataUpdate["0"].nombre && (
                  <>
                    <Controller
                      name="nombre"
                      control={control}
                      defaultValue={dataUpdate["0"].nombre}
                      type="text"
                      rules={{
                        required: "Este campo es requerido",
                        pattern: {
                          value: /^\S[a-zA-ZÁÉÍÓÚáéíóúñÑ!?¿¡ ]+$/,
                          message: "Este campo solo permite letras y números",
                        },
                        minLength: {
                          value: 8,
                          message: "Este campo requiere de más caracteres",
                        },
                        maxLength: {
                          value: 30,
                          message: "Este campo requiere de menos caracteres",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          style={{
                            height: "5em",
                            marginBottom: "4px",
                            fontSize: "13px",
                            padding: "20px",
                          }}
                          placeholder="Digite el nombre"
                          {...field}
                        />
                      )}
                    />
                    {errors.nombre && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "13px",
                          fontWeight: 400,
                          paddingLeft: "4%",
                        }}
                      >
                        {errors.nombre.message}
                      </p>
                    )}
                  </>
                )}
                {dataUpdate["0"].descripcion && (
                  <>
                    <Controller
                      name="descripcion"
                      control={control}
                      defaultValue={dataUpdate["0"].descripcion}
                      rules={{
                        required: "Este campo es requerido",
                        pattern: {
                          value: /^\S[0-9a-zA-ZÁÉÍÓÚáéíóúñÑ!.?¿¡\s+ ]+$/,
                          message: "Este campo solo permite letras y números",
                        },
                        minLength: {
                          value: 8,
                          message: "Este campo requiere de más caracteres",
                        },
                        maxLength: {
                          value: 160,
                          message: "Este campo requiere de menos caracteres",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          type="textarea"
                          style={{
                            marginBottom: "4px",
                            fontSize: "13px",
                            borderRadius: "30px",
                            border: "1px solid #E3E3E3",
                            padding: "20px",
                          }}
                          placeholder="Digite la descripción"
                          {...field}
                        />
                      )}
                    />
                    {errors.descripcion && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "13px",
                          fontWeight: 400,
                          paddingLeft: "4%",
                        }}
                      >
                        {errors.descripcion.message}
                      </p>
                    )}
                  </>
                )}
                {dataUpdate["0"].imagenes && (
                  <ImageSelector
                    imagenes={dataUpdate["0"].imagenes}
                    dataUpdate={dataUpdate}
                    messageErrFiles={messageErrFiles}
                    setMessageErrFiles={setMessageErrFiles}
                    setFiles={setFiles}
                    files={files}
                    control={control}
                    setDisabled={setDisabled}
                    setImages={setImages}
                    images={images}
                  />
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
                        alt={""}
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
                    {/* </Alert> */}
                  </Dialog>
                )}
                <div className="send-button">
                  <Button
                    disabled={Boolean(messageErrFiles) || disabled}
                    block
                    className="btn-round"
                    color="info"
                    type="submit"
                    size="lg"
                    // tag={Link}
                  >
                    Actualizar actividad
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
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
    addActivitiesData: (data) =>
      dispatch({
        type: ACTIVITIES,
        payload: {
          data,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesForm);
