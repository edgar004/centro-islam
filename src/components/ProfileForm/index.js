import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import TableCRUD from "components/TableCRUD";
import { connect } from "react-redux";
// import { post } from "fetch";
import dotenv from "dotenv";
import DialogModal from "components/DialogModal";
import { post, get } from "helpers/fetch";
import { uploadFiles } from "helpers/uploadFiles";
import ProfileFormUpdate from "components/UpdateComponents/ProfileFormUpdate";
dotenv.config();
const resetField = {
  nombre: "",
  descripcion: "",
  facebook: "",
  correo: "",
  instagram: "",
};
function ProfileForm({
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
  //eslint-disable-next-line
  const [file, setFile] = useState([]);
  const [dataGet, setDataGet] = useState();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [messageSuccess, setMessageSuccess] = useState("");
  const [avatar, setAvatarImage] = useState([]);
  const [fileLogo, setFileLogo] = useState([]);

  const getData = () => {
    get("/propietario")
      .then((e) => e.json())
      .then(({ data }) => setDataGet(data));
  };
  const changeInput = (e) => {
    let newImgsToState = convertFiles(e);
    setFileLogo(e);
    setAvatarImage(newImgsToState);
  };
  const removeImage = (id) => {
    var myIndex = avatar.indexOf(avatar[id]);
    if (myIndex !== -1) {
      avatar.splice(myIndex, 1);
    }
    setAvatarImage(avatar);
  };
  const convertFiles = (imgs) => {
    let arrImages = [];

    Object.keys(imgs).forEach((i) => {
      const fileImg = imgs[i];
      let url = URL.createObjectURL(fileImg);
      arrImages.push(url);
    });
    return arrImages;
  };
  useEffect(() => {
    getData();
  }, []);
  //eslint-disable-next-line
  const onSubmitSave = async (data) => {
    setStatus(0);
    const url = await uploadFiles(fileLogo);
    const body = {
      nombre: data.nombre,
      descripcion: data.descripcion,
      avatar: url[0],
      redes: [
        {
          instagram: data.instagram,
          facebook: data.facebook,
          correo: data.correo,
        },
      ],
    };
    post("/propietario", body).then((res) => {
      setStatus(res.status);
      if (res.status === 201) {
        setMessageSuccess("Se han agregado de forma correcta");
      }
    });
    setTimeout(() => {
      setMessageSuccess("");
      setStatus();
    }, 2000);
    setFileLogo([]);
    setAvatarImage([]);
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
                  Configuración de la vista de "Perfiles"
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
                        value: /^\S[0-9a-zA-ZÁÉÍÓÚáéíóúñÑ!.?¿¡+ ]+$/,
                        message:
                          "Este campo solo permite letras, recuerda que los nombres propios empiezan con mayúsculas",
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
                  <label className={"btn"}>
                    <span>Presione para selecionar fotos</span>
                    <Controller
                      name="avatar"
                      control={control}
                      defaultValue={[]}
                      render={() => (
                        <Input
                          hidden
                          style={{ margin: "2%" }}
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
                  {avatar[0] && (
                    <Col sm={5}>
                      <Button
                        close
                        onClick={() => {
                          removeImage(0);
                        }}
                      />
                      <img src={avatar[0]} alt={""} />
                    </Col>
                  )}
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
                      {status === 201 || status === 200 ? messageSuccess : ""}
                    </Alert>
                  )}
                  <div className="send-button">
                    <Button
                      disabled={!isObjEmpty(dataUpdate) || !avatar[0]}
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
                url="/propietario"
                getData={getData}
              />
            </Col>
          </Container>
        </div>
      ) : (
        <DialogModal
          component={
            <ProfileFormUpdate
              getData={getData}
              setOpen={setOpen}
              // files={file}
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
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addActivitiesData: (data) =>
//       dispatch({
//         type: ACTIVITIES,
//         payload: {
//           data,
//         },
//       }),
//   };
// };
export default connect(mapStateToProps)(ProfileForm);
