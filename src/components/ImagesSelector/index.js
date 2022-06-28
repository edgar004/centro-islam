import React from "react";
import { Controller } from "react-hook-form";
import { connect } from "react-redux";
import { Button, Col, Container, Input } from "reactstrap";
import { DATA_UPDATES } from "redux/globalState";

const ImageSelector = ({
  messageErrFiles,
  setMessageErrFiles,
  setFiles,
  imagenes,
  dataUpdate,
  control,
  setDisabled,
  files,
  addSocialMediaUpdateData,
  setImages,
  images,
}) => {
  const removeImage = (id) => {
    var myIndex = images.indexOf(images[id]);
    if (myIndex !== -1) {
      images.splice(myIndex, 1);
    }
    var myIndexFiles = files.indexOf(files[id]);
    if (myIndexFiles !== -1) {
      files.splice(myIndexFiles, 1);
    }
    setImages(images);
    validationFiles(images);
    addSocialMediaUpdateData(dataUpdate);
  };
  const changeInput = (e) => {
    let newImgsToState = convertFiles(e);
    let newImgsState = [...images, ...newImgsToState];
    let filesImgState = [...files, ...e];
    setImages(newImgsState);
    setFiles(filesImgState);
    validationFiles(newImgsState);
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
  const validationFiles = (img) => {
    if (img.length < 3) {
      setMessageErrFiles("Deben ser selecionadas más fotografías");
      setDisabled(true);
    } else {
      setMessageErrFiles("");
      setDisabled(false);
    }
  };

  return (
    <>
      <Container style={{ display: "flex", overflow: "scroll" }}>
        {images &&
          images.map((i, key) => (
            <Col sm={5} style={{ display: "flex" }}>
              <Button
                close
                onClick={() => {
                  removeImage(key);
                }}
              ></Button>
              <img src={i} alt={""} />
            </Col>
          ))}
      </Container>
      {imagenes.length < 3 && (
        <label className={"btn"}>
          <span>Presione para selecionar fotos</span>
          <Controller
            name="imagenes"
            control={control}
            defaultValue={imagenes}
            render={() => (
              <Input
                style={{ margin: "2%" }}
                hidden
                multiple
                id="fileItem"
                accept={".png, .jpg, .jpeg"}
                type="file"
                onChange={(event) => {
                  setFiles(event.target.files);
                  changeInput(event.target.files);
                }}
              />
            )}
          />
        </label>
      )}
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
    </>
  );
};
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ImageSelector);
