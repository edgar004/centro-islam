import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import TableCRUD from "components/TableCRUD";
import { connect } from "react-redux";
import { ACTIVITIES } from "redux/globalState";
import dotenv from "dotenv";
import ActivitiesFormUpdate from "components/UpdateComponents/ActivitiesFormUpdate";
import DialogModal from "components/DialogModal";
import { post, get } from "helpers/fetch";
import { uploadFiles } from "helpers/uploadFiles";
dotenv.config();
const resetField = {
  nombre: "",
  descripcion: "",
  imagenes: "",
};
function ActivitiesForm({
  state: {
    globalState: { dataUpdate },
  },
  addActivitiesData,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [files, setFiles] = useState([]);
  const [messageErrFiles, setMessageErrFiles] = useState("");
  const [dataGet, setDataGet] = useState();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [messageSuccess, setMessageSuccess] = useState("");
  const [images, setImages] = useState([]);
  const getData = () => {
    get("/actividad")
      .then((e) => e.json())
      .then(({ data }) => setDataGet(data));
  };
  const changeInput = (e) => {
    let newImgsToState = convertFiles(e);
    let newImgsState = [...images, ...newImgsToState];
    let filesImgState = [...files, ...e];
    setImages(newImgsState);
    setFiles(filesImgState);
    validation(filesImgState);
  };

  const validation = (imgs) => {
    if (imgs.length < 3) {
      setMessageErrFiles("Deben ser selecionadas 3 o más fotografías");
    } else {
      setMessageErrFiles("");
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
    var myIndexFiles = files.indexOf(files[id]);
    if (myIndexFiles !== -1) {
      files.splice(myIndexFiles, 1);
    }
    setFiles(files);
    setImages(images);
    validation(images);
  };

  useEffect(() => {
    getData();
  }, []);
  //eslint-disable-next-line
  const onSubmitSave = async (data) => {
    setStatus(0);
    const url = await uploadFiles(files);
    Object.assign(data, { imagenes: url });
    if (images.length >= 3) {
      post("/actividad", data).then((res) => {
        setStatus(res.status);
        if (res.status === 201) {
          setMessageSuccess("Se han agregado de forma correcta");
        }
      });
    } else {
      setMessageErrFiles("Recuerde seleccionar las imagenes correspondientes");
    }
    setTimeout(() => {
      setMessageSuccess("");
      setMessageErrFiles("");
      setStatus();
    }, 2000);
    addActivitiesData(data);
    setFiles([]);
    setImages([]);
    getData();
  };
  function isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  return (
    <>
      {!open ? (
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
                <form
                  onSubmit={handleSubmit((data) => {
                    onSubmitSave(data);
                    reset(resetField);
                  })}
                >
                  <Controller
                    name="nombre"
                    control={control}
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
                  <Controller
                    name="descripcion"
                    control={control}
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

                  <label className={"btn"}>
                    <span>Presione para selecionar fotos</span>
                    <Controller
                      name="imagenes"
                      control={control}
                      defaultValue={[]}
                      render={({ props }) => (
                        <Input
                          hidden
                          style={{ margin: "2%" }}
                          multiple
                          id="fileItem"
                          accept={".png, .jpg, .jpeg"}
                          type="file"
                          onChange={(event) => {
                            changeInput(event.target.files);
                          }}
                        />
                      )}
                    />
                  </label>
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
                        <img src={i} alt={""}/>
                      </Col>
                    ))}
                  </Container>
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
                    Agregar imagenes de actividad ha registrar
                  </p>
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
                          : status === 0 || !status
                          ? ""
                          : "danger"
                      }
                    >
                      {status === 201 ? messageSuccess : ""}
                    </Alert>
                  )}
                  <div className="send-button">
                    <Button
                      disabled={
                        Boolean(messageErrFiles) || !isObjEmpty(dataUpdate)
                      }
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                      size="lg"
                    >
                      Crear actividad
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
            <Col
              className="text-center"
              style={{ position: "float", padding: "em" }}
            >
              <TableCRUD
                dataGet={dataGet || []}
                setOpen={setOpen}
                open={open}
                url="/actividad"
                getData={getData}
              />
            </Col>
          </Container>
        </div>
      ) : (
        <DialogModal
          component={
            <ActivitiesFormUpdate
              getData={getData}
              setOpen={setOpen}
              files={files}
            />
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
