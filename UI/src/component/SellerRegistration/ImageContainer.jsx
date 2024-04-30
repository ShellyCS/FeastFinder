import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ImageUploading from "react-images-uploading";

import ImageIcon from "@mui/icons-material/Image";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import CancelIcon from "@mui/icons-material/Cancel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Typography } from "@mui/material";
const ImageContainer = ({
  label,
  onChange: onHandleImageChange,
  error,
  helperText,
  base64Image,
}) => {
  const [images, setImages] = useState([]);
  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
    onHandleImageChange(imageList[0] || {});
  };
  useEffect(() => {
    if (base64Image) {
      setImages([
        {
          data_url: `data:image/jpeg;base64,${base64Image}`,
        },
      ]);
    }
  }, [base64Image]);
  return (
    <Grid container alignItems={"center"} spacing={1}>
      <Grid item>
        <ImageUploading
          value={images}
          onChange={onChange}
          dataURLKey="data_url"
          maxNumber={1}
          acceptType={["jpg", "png"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            dragProps,
            errors,
          }) => (
            <Grid
              container
              direction={"column"}
              alignItems={"center"}
              sx={{
                position: "relative",
              }}
            >
              {Array.isArray(imageList) &&
              imageList.length > 0 &&
              imageList[0].data_url ? (
                <React.Fragment>
                  <CancelIcon
                    sx={{
                      top: "-10px",
                      right: "-10px",
                      position: "absolute",
                      cursor: "pointer",
                      zIndex: 2,
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                    onClick={onImageRemoveAll}
                    color="error"
                  />
                  <Grid item>
                    <img
                      src={imageList[0].data_url}
                      alt=""
                      width="300"
                      height={"auto"}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: "10px",
                        padding: "2.5px 5px",
                      }}
                      color="primary"
                      onClick={onImageUpdate}
                    >
                      Update
                    </Button>
                  </Grid>
                </React.Fragment>
              ) : (
                <Grid
                  item
                  sx={{
                    padding: "10px 15px",
                    border: error ? "1px solid red" : "1px solid black",
                    borderStyle: "dashed",
                    cursor: "pointer",
                    borderRadius: "8px",
                  }}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <Grid container direction={"column"} alignItems={"center"}>
                    <Grid item>
                      <AddPhotoAlternateIcon
                        color={error ? "error" : "primary"}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle1"
                        color={error ? "error" : "primary"}
                      >
                        {label}
                      </Typography>
                    </Grid>
                    {error ? (
                      <Grid item>
                        <Typography variant="subtitle2" color="error">
                          {helperText}
                        </Typography>
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </ImageUploading>
      </Grid>
    </Grid>
  );
};

export default ImageContainer;
