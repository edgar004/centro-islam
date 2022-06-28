import React, { useState } from "react";
import { Button, Col, Container, Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import "../../../views/examples/CSS/index.css";
import { HOME } from "redux/globalState";
import { connect } from "react-redux";
import dotenv from "dotenv";
import { put } from "helpers/fetch";
import { uploadFiles } from "helpers/uploadFiles";
import { Dialog } from "@mui/material";
import check from "images/check.png";
import warning from "images/warning.png";
dotenv.config();

function GeneralConfigForm({
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
  } = useForm();
  const [fileLogo, setFileLogo] = useState(dataUpdate["0"].logo);
  const [logo, setLogo] = useState([]);
  const [imgs, setImgs] = useState([]);
  //eslint-disable-next-line
  const [messageErrFiles, setMessageErrFiles] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [images, setImages] = useState(dataUpdate["0"].imagenes);
  const changeInput = (e) => {
    let newImgsToState = convertFiles(e);
    let newImgsState = [...dataUpdate[0].imagenes, ...newImgsToState];
    setImgs(e);
    setImages(newImgsState);
    validation(newImgsState, "imagenes");
  };
  const changeInputLogo = (e) => {
    let newImgsToState = convertFiles(e);
    setFileLogo(newImgsToState);
    setLogo(e);
  };

  const onSubmitUpdate = async (data) => {
    const urlLogo = await uploadFiles(logo);
    const url = await uploadFiles(imgs);
    Object.assign(data, {
      imagenes: [...dataUpdate[0].imagenes, ...url],
      logo: urlLogo["0"],
      id: dataUpdate[0]._id,
    });
    put("/configuracion", data).then((res) => {
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
  const validation = (imgs, label) => {
    if (label === "imagenes") {
      if (imgs.length < 3) {
        setMessageErrFiles("Deben ser selecionadas 3 o más fotografías");
      } else {
        setMessageErrFiles("");
      }
    }
  };
  const convertFiles = (files) => {
    let arrImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];
      let url = URL.createObjectURL(file);
      arrImages.push(url);
    });
    return arrImages;
  };

  const removeImage = (id) => {
    var myIndex = images.indexOf(images[id]);
    if (myIndex !== -1) {
      images.splice(myIndex, 1);
    }
    setImages(images);
    validation(images, "imagenes");
  };
  const removeLogoImage = () => {
    setFileLogo("");
  };
  return (
    <div className="section section-contact-us container-bhb">
      <Container>
        <Col className=" ml-auto mr-auto" style={{ padding: "30px" }}>
          <h4
            className="title text-center"
            style={{ color: "#6e818e", marginBottom: "8%" }}
          >
            Configuración de la vista de "Inicio"
          </h4>
          <form onSubmit={handleSubmit((data) => onSubmitUpdate(data))}>
            {dataUpdate["0"] && dataUpdate["0"].nombre && (
              <>
                <Controller
                  name="nombre"
                  control={control}
                  defaultValue={dataUpdate["0"].nombre}
                  rules={{
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^\S[0-9a-zA-ZñÑ!?¿¡ ]+$/,
                      message: "Este campo solo permite letras y números",
                    },
                    maxLength: {
                      value: 30,
                      message: "Este campo requiere de menos caracteres",
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
                      placeholder="Digite el nombre del centro"
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
            {dataUpdate["0"].tituloDescripcion && (
              <>
                <Controller
                  name="tituloDescripcion"
                  control={control}
                  defaultValue={dataUpdate["0"].tituloDescripcion}
                  rules={{
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^\S[0-9a-zA-ZñÑ!?¿¡,. ]+$/,
                      message: "Este campo solo permite letras y números",
                    },
                    minLength: {
                      value: 8,
                      message: "Este campo requiere de más caracteres",
                    },
                    maxLength: {
                      value: 60,
                      message: "Este campo requiere de menos caracteres",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      className="Título"
                      style={{
                        height: "5em",
                        marginBottom: "4px",
                        fontSize: "14px",
                        padding: "20px",
                      }}
                      placeholder="Digite el título de la descripción"
                      {...field}
                    />
                  )}
                />
                {errors.tituloDescripcion && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "13px",
                      fontWeight: 400,
                      paddingLeft: "4%",
                    }}
                  >
                    {errors.tituloDescripcion.message}
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
                  type="text"
                  rules={{
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^\S[0-9a-zA-ZÁÉÍÓÚáéíóúñÑ!.,?¿¡\s+ ]+$/,
                      message: "Este campo solo permite letras y números",
                    },
                    minLength: {
                      value: 8,
                      message: "Este campo requiere de más caracteres",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      style={{
                        marginBottom: "4px",
                        fontSize: "14px",
                        borderRadius: "30px",
                        border: "1px solid #E3E3E3",
                        padding: "20px",
                      }}
                      type="textarea"
                      placeholder="Digite la descripción del centro"
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

            {dataUpdate["0"].logo && (
              <>
                <label className={"btn"}>
                  <span>Presione para selecionar fotos</span>
                  <Controller
                    name="logo"
                    control={control}
                    defaultValue={dataUpdate["0"].logo}
                    render={() => (
                      <Input
                        style={{ margin: "3%" }}
                        accept={".png, .jpg, .jpeg"}
                        hidden
                        type="file"
                        onChange={(event) => {
                          changeInputLogo(event.target.files, "logo");
                        }}
                      />
                    )}
                  />
                </label>
                <p className="logo" style={{ fontSize: "13px" }}>
                  Agregar el logo de la aplicacion
                </p>
                <Container style={{ display: "flex", overflow: "scroll" }}>
                  {fileLogo && (
                    <Col sm={5}>
                      <Button
                        close
                        onClick={() => {
                          removeLogoImage();
                          getData();
                        }}
                      />
                      <img src={fileLogo} alt={""} />
                    </Col>
                  )}
                </Container>
              </>
            )}

            {dataUpdate["0"].imagenes && (
              <>
                <label className={"btn"}>
                  <span>Presione para selecionar fotos</span>
                  <Controller
                    name="imagenes"
                    control={control}
                    defaultValue={dataUpdate["0"].imagenes}
                    render={() => (
                      <Input
                        hidden
                        style={{ margin: "3%" }}
                        multiple
                        accept={".png, .jpg, .jpeg"}
                        type="file"
                        onChange={(event) => {
                          changeInput(event.target.files, "imagenes");
                        }}
                      />
                    )}
                  />
                </label>
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: 400,
                    paddingLeft: "4%",
                  }}
                >
                  {messageErrFiles}
                </p>
                <p className="description" style={{ fontSize: "13px" }}>
                  Agregar las imagenes que apareceran en el carusel
                </p>
              </>
            )}
            <Container style={{ display: "flex", overflow: "scroll" }}>
              {images.map((i, id) => (
                <Col sm={5}>
                  <Button
                    close
                    onClick={() => {
                      removeImage(id);
                      getData();
                    }}
                  />
                  <img src={i} alt={""} />
                </Col>
              ))}
            </Container>
            {status !== 0 && (
              <Dialog maxWidth={"md"} open={Boolean(message)}>
                <div
                  style={{
                    padding: "3%",
                    textAlign: "center",
                    fontSize: "18px",
                    backgroundColor:
                      status === 200 || status === 201 ? "#FFFFFF" : "#F7EF3B",
                  }}
                >
                  <img
                    alt={""}
                    src={status === 200 || status === 201 ? check : warning}
                    width={"30%"}
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
                  messageErrFiles || images.length < 3 || !Boolean(fileLogo)
                )}
                block
                className="btn-round"
                color="info"
                type="submit"
                size="lg"
              >
                Actualizar configuración
              </Button>
            </div>
          </form>
        </Col>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addHomeData: (data) =>
      dispatch({
        type: HOME,
        payload: {
          data,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GeneralConfigForm);
