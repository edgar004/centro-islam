import React, { useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { SCHEDULE_FORM } from "redux/globalState";
import dotenv from "dotenv";
import { put } from "helpers/fetch";
import { Dialog } from "@mui/material";
import check from "images/check.png";
import warning from "images/warning.png";

dotenv.config();

function ScheduleForm({
  addScheduleData,
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
  //eslint-disable-next-line
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);

  const onSubmitSave = (data) => {
    Object.assign(data, { id: dataUpdate[0]._id });
    put("/evento", data).then((res) => {
      setStatus(res.status);
      switch (res.status) {
        case 200:
        case 201:
          setMessage("Este evento fue actualizado de forma exitosa");
          addScheduleData(data);
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
  const date = dataUpdate["0"].fecha.replace(":00.000Z", "");
  return (
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
            <form onSubmit={handleSubmit((data) => onSubmitSave(data))}>
              {dataUpdate["0"] && dataUpdate["0"].titulo && (
                <>
                  <Controller
                    name="titulo"
                    control={control}
                    defaultValue={dataUpdate["0"].titulo}
                    rules={{
                      required: "Este campo es requerido",
                      pattern: {
                        value: /^\S[0-9a-zA-Z ]+$/,
                        message: "Este campo solo permite letras y números",
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
                    defaultValue={date}
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
                      width={"30%"} alt={"status"}
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
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addScheduleData: (data) =>
      dispatch({
        type: SCHEDULE_FORM,
        payload: {
          data,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm);
