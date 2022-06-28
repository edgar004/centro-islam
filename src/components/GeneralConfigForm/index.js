import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Input,
  Spinner,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import TableCRUD from "components/TableCRUD";
import "../../views/examples/CSS/index.css";
import { HOME } from "redux/globalState";
import { connect } from "react-redux";
import dotenv from "dotenv";
import GeneralConfigFormUpdate from "components/UpdateComponents/GeneralConfigFormUpdate";
import DialogModal from "components/DialogModal";
import { uploadFiles } from "helpers/uploadFiles";
import { post } from "helpers/fetch";
import { get } from "helpers/fetch";

dotenv.config();
const resetField = {
  nombre: "",
  tituloDescripcion: "",
  descripcion: "",
  imagenes: [],
  logo: [],
};

function GeneralConfigForm({
  addHomeData,
  state: {
    globalState: { dataUpdate },
  },
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [files, setFiles] = useState([]);
  const [fileLogo, setFileLogo] = useState([]);
  //eslint-disable-next-line
  const [messageErrFiles, setMessageErrFiles] = useState("");
  const [dataGet, setDataGet] = useState();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [logo, setLogoImage] = useState([]);

  const changeInput = (e) => {
    let newImgsToState = convertFiles(e);
    let newImgsState = [...images, ...newImgsToState];
    let filesImgState = [...files, ...e];
    setFiles(filesImgState);
    setImages(newImgsState);
    validation(filesImgState, "imagenes");
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
    var myIndexImages = images.indexOf(images[id]);
    if (myIndexImages !== -1) {
      images.splice(myIndexImages, 1);
    }
    var myIndexFiles = files.indexOf(files[id]);
    if (myIndexFiles !== -1) {
      files.splice(myIndexFiles, 1);
    }
    setFiles(files);
    setImages(images);
    validation(files, "imagenes");
  };
  const changeInputLogo = (e) => {
    let newImgsToState = convertLogoFile(e);
    setFileLogo(e);
    setLogoImage(newImgsToState);
  };
  const convertLogoFile = (files) => {
    let arrImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];
      let url = URL.createObjectURL(file);
      arrImages.push(url);
    });
    return arrImages;
  };
  const removeLogoImage = (id) => {
    var myIndex = logo.indexOf(logo[id]);
    if (myIndex !== -1) {
      logo.splice(myIndex, 1);
    }
    setLogoImage(logo);
  };
  const getData = () => {
    get("/configuracion")
      .then((e) => e.json())
      .then(({ data }) => setDataGet(data));
  };

  useEffect(() => {
    getData();
  }, []);
  const onSubmitSave = async (data) => {
    setStatus(0);
    const url = await uploadFiles(files);
    const urlLogo = await uploadFiles(fileLogo);
    Object.assign(data, { imagenes: url, logo: urlLogo[0] });
    post("/configuracion", data).then((res) => {
      setStatus(res.status);
      switch (res.status) {
        case 200:
        case 201:
          setMessage("Esta red fue creada de forma exitosa");
          addHomeData(data);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          return res.json();
        default:
          setMessage("");
      }
    });
    setTimeout(() => setMessage(""), 2000);
    setTimeout(() => setStatus(), 2000);

    setFiles([]);
    setImages([]);
    setFileLogo([]);
    setLogoImage([]);
    getData();
  };

  function isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }
  const validation = (imgs, label) => {
    if (label === "imagenes") {
      if (imgs.length < 3) {
        setMessageErrFiles("Deben ser selecionadas 3 o más fotografías");
      } else {
        setMessageErrFiles("");
      }
    }
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
                Configuración de la vista de "Inicio"
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
                  rules={{
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^\S[a-zA-ZÁÉÍÓÚáéíóúñÑ!?¿¡ ]+$/,
                      message:
                        "Este campo no permite algunos caracteres digitados",
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
                <Controller
                  name="tituloDescripcion"
                  control={control}
                  rules={{
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^\S[a-zA-ZÁÉÍÓÚáéíóúñÑ!?¿¡,. ]+$/,
                      message:
                        "Este campo no permite algunos caracteres digitados",
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
                <Controller
                  name="descripcion"
                  control={control}
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
                <label className={"btn"}>
                  <span>Presione para selecionar fotos</span>

                  <Controller
                    name="logo"
                    control={control}
                    defaultValue={[]}
                    render={() => (
                      <Input
                        hidden
                        style={{ margin: "3%" }}
                        accept={".png, .jpg, .jpeg"}
                        type="file"
                        onChange={(event) => {
                          changeInputLogo(event.target.files);
                        }}
                      />
                    )}
                  />
                </label>
                {logo[0] && (
                  <Col sm={3}>
                    <Button
                      close
                      onClick={() => {
                        removeLogoImage(0);
                        getData();
                      }}
                    />
                    <img src={logo[0]} alt={""} />
                  </Col>
                )}
                <p className="description" style={{ fontSize: "13px" }}>
                  Agregar <b>una imagen</b> que represente la imagen principal
                  de las vistas
                </p>
                <label className={"btn"}>
                  <span>Presione para selecionar fotos</span>

                  <Controller
                    name="imagenes"
                    control={control}
                    defaultValue={[]}
                    render={() => (
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

                <div></div>
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
                  Agregar <b> 3 o más imagenes </b> que apareceran en el carusel
                </p>
                <Container style={{ display: "flex", overflow: "scroll" }}>
                  {images.map((i, id) => (
                    <Col sm={3}>
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

                {dataGet && dataGet.length === 1 && (
                  <Alert color="info">
                    <b>Información: </b>
                    <br />
                    Ya se ha registrado una Configuración, solo puedes tener una
                    configuración registrada
                  </Alert>
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
                        : status === 0 || !status
                        ? ""
                        : "danger"
                    }
                  >
                    {status === 201 || status === 200 ? message : ""}
                  </Alert>
                )}
                <div className="send-button">
                  <Button
                    disabled={
                      Boolean(messageErrFiles) ||
                      !isObjEmpty(dataUpdate) ||
                      images.length < 3 ||
                      !Boolean(logo[0]) ||
                      dataGet.length === 1
                    }
                    block
                    className="btn-round"
                    color="info"
                    type="submit"
                    size="lg"
                  >
                    Crear evento
                  </Button>
                </div>
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
                url="/configuracion"
                getData={getData}
              />
            </Col>
          </Container>
        </div>
      ) : (
        <DialogModal
          component={
            <GeneralConfigFormUpdate
              getData={getData}
              setOpen={setOpen}
              images={images}
              files={files}
              fileLogo={fileLogo}
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
