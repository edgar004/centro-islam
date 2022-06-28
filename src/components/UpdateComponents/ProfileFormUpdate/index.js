import React, { useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";

import dotenv from "dotenv";
import { uploadFiles } from "helpers/uploadFiles";
import { put } from "helpers/fetch";
import { Dialog } from "@mui/material";
import check from "images/check.png";
import warning from "images/warning.png";
dotenv.config();

function ProfileFormUpdate({
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
  const [status, setStatus] = useState(0);
  const [avatar, setAvatarImage] = useState(dataUpdate["0"].avatar);
  const [fileLogo, setFileLogo] = useState([]);
  const [message, setMessage] = useState("");

  const changeInput = (e) => {
    let newImgsToState = convertFiles(e);
    setFileLogo(e);
    setAvatarImage(newImgsToState);
  };
  const removeImage = () => {
    setAvatarImage("");
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

  //eslint-disable-next-line
  const onSubmitUpdate = async (data) => {
    const url = await uploadFiles(fileLogo);
    const body = {
      id: dataUpdate[0]._id,
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

    put("/propietario", body).then((res) => {
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

    getData();
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
                Configuración de la vista de "Perfiles"
              </h4>
              <form
                onSubmit={handleSubmit((data) => {
                  onSubmitUpdate(data);
                })}
              >
                <Controller
                  name="nombre"
                  control={control}
                  defaultValue={dataUpdate["0"].nombre}
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
                {dataUpdate[0].redes &&
                  dataUpdate[0].redes.map((e, i) => (
                    <>
                      <Controller
                        name={"instagram"}
                        control={control}
                        defaultValue={e.instagram}
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
                            placeholder={`Pegue el link del instagram del centro`}
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
                        name={"facebook"}
                        control={control}
                        defaultValue={e.facebook}
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
                            placeholder={`Pegue el link del facebook del centro`}
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
                        name={"correo"}
                        control={control}
                        defaultValue={e.correo}
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
                            placeholder={`Pegue el link del correo del centro`}
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
                  ))}

                <></>

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
                {avatar && (
                  <Col sm={5}>
                    <Button
                      close
                      onClick={() => {
                        removeImage(0);
                        getData();
                      }}
                    />
                    <img src={avatar} alt={"avatar"} />
                  </Col>
                )}
                <p className="description" style={{ fontSize: "13px" }}>
                  Agregar imagenes del avatar ha registrar
                </p>
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
                        alt={'status'}
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
                    disabled={!Boolean(avatar)}
                    block
                    className="btn-round"
                    color="info"
                    type="submit"
                    size="lg"
                  >
                    Crear Perfil
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps)(ProfileFormUpdate);
