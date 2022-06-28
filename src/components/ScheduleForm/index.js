import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import TableCRUD from "components/TableCRUD";
import { connect } from "react-redux";
import dotenv from "dotenv";
import ScheduleFormUpdate from "components/UpdateComponents/ScheduleFormUpdate";
import DialogModal from "components/DialogModal";
import { post, get } from "helpers/fetch";
dotenv.config();
const resetField = {
  titulo: "",
  fecha: "",
  url: "",
};

function ScheduleForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  //eslint-disable-next-line
  const [dataGet, setDataGet] = useState({});
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [messageSuccess, setMessageSuccess] = useState("");

  const getData = () => {
    get("/evento")
      .then((e) => e.json())
      .then(({ data }) => {
        setDataGet(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmitSave = (data) => {
    setStatus(0)
    Object.assign(data, { fecha: data.fecha + ":00" });
    post("/evento", data)
      .then((res) => {
        setStatus(res.status);
        if (res.status === 201) {
          setMessageSuccess("Se han agregado de forma correcta");
        }
        getData();
        return res.json();
      })
    setTimeout(() => setMessageSuccess(""), 2000);
    setTimeout(() => setStatus(), 2000);
  };

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
                  Configuración de la vista de "Agenda"
                </h4>
                <form
                  onSubmit={handleSubmit((data) => {
                    onSubmitSave(data);
                    getData();
                    reset(resetField);
                  })}
                >
                  <Controller
                    name="titulo"
                    control={control}
                    rules={{
                      required: "Este campo es requerido",
                      pattern: {
                        value: /^\S[0-9a-zA-ZñÑ!?¿¡ ]+$/,
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
                        type="text"
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
                  {errors.titulo && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "13px",
                        fontWeight: 400,
                        paddingLeft: "4%",
                      }}
                    >
                      {errors.titulo.message}
                    </p>
                  )}
                  <Controller
                    name="fecha"
                    control={control}
                    rules={{
                      required: "Este campo es requerido",
                    }}
                    render={({ field }) => (
                      <Input
                        type="datetime-local"
                        style={{
                          marginBottom: "4px",
                          fontSize: "13px",
                          borderRadius: "30px",
                          border: "1px solid #E3E3E3",
                          padding: "20px",
                        }}
                        {...field}
                      />
                    )}
                  />
                  {errors.fecha && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "13px",
                        fontWeight: 400,
                        paddingLeft: "4%",
                      }}
                    >
                      {errors.fecha.message}
                    </p>
                  )}

                  <Controller
                    name="url"
                    control={control}
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
                        type="text"
                        style={{
                          marginBottom: "4px",
                          fontSize: "13px",
                          borderRadius: "30px",
                          border: "1px solid #E3E3E3",
                          padding: "20px",
                        }}
                        placeholder="Coloque el link de la reunión o evento"
                        {...field}
                      />
                    )}
                  />
                  {errors.url && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "13px",
                        fontWeight: 400,
                        paddingLeft: "4%",
                      }}
                    >
                      {errors.url.message}
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
            </Row>
            <Col
              className="text-center"
              style={{ position: "float", padding: "em" }}
            >
              <TableCRUD
                dataGet={dataGet || []}
                setOpen={setOpen}
                open={open}
                url="/evento"
                getData={getData}
              />
            </Col>
          </Container>
        </div>
      ) : (
        <DialogModal
          component={<ScheduleFormUpdate getData={getData} setOpen={setOpen} />}
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
export default connect(mapStateToProps)(ScheduleForm);
