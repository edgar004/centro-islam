import React from "react";
import { Button, Table } from "reactstrap";
import "../../views/examples/CSS/index.css";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { DATA_UPDATES } from "redux/globalState";
import { connect } from "react-redux";
import { RESET_DATA_UPDATE } from "redux/globalState";
import { del } from "helpers/fetch";

function TableCRUD({
  setOpen,
  open,
  dataGet,
  url,
  addSocialMediaUpdateData,
  getData,
  addSocialMediaDataUpdate,
}) {
  
  const onEdit = (id) => {
    const dataUpdate = dataGet.filter(({ _id }) => _id === id);
    addSocialMediaUpdateData(dataUpdate);
    addSocialMediaDataUpdate(true);
    setOpen(!open);
  };

  const onDel = (body) => {
    del(url, body);
    getData();
  };

  return (
    <div
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        marginTop: "20%",
      }}
      className="container-table-height"
    >
      <Table height="200">
        <thead>
          <tr>
            {url === "/red" || url === "/evento" ? <th> Url o link</th> : ""}
            {url !== "/evento" && <th>Descripción</th>}
            {dataGet["0"] && dataGet["0"].titulo && <th>Título</th>}
            {dataGet["0"] && dataGet["0"].nombre && <th>Nombre</th>}
            {url === "/evento" && <th>Fecha</th>}
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {dataGet.length >= 0 &&
            dataGet.map(
              (
                { _id, descripcion, nombre, titulo, url, fecha, imagenes },
                key
              ) => (
                <tr>
                  {url && <td>{url}</td>}
                  {descripcion && <th scope="row">{descripcion}</th>}
                  {titulo && <th scope="row"> {titulo}</th>}
                  {nombre && <th scope="row">{nombre}</th>}
                  {fecha && <th scope="row">{fecha.substr(0, 10)}</th>}

                  <td>
                    <Button
                      name={_id}
                      outline
                      color="info"
                      onClick={() => {
                        onEdit(_id);
                      }}
                    >
                      <BsPencilFill />
                    </Button>
                  </td>
                  <th>
                    <Button
                      outline
                      color="danger"
                      onClick={() => {
                        onDel({
                          descripcion,
                          url,
                          id: _id,
                        });
                      }}
                    >
                      <BsTrashFill />
                    </Button>
                  </th>
                </tr>
              )
            )}
        </tbody>
      </Table>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addSocialMediaUpdateData: (data) =>
      dispatch({
        type: DATA_UPDATES,
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
export default connect(mapStateToProps, mapDispatchToProps)(TableCRUD);
