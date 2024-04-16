import { useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import ImageIcon from "@mui/icons-material/Image";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";

const ImageContainer = ({ image, onChange, label }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <Grid container alignItems={"center"} spacing={1}>
      <Grid item>
        <TextField
          id="restaurant_image"
          type="file"
          name="restaurant_image"
          onChange={onChange}
          fullWidth
          InputProps={{
            sx: {
              fontSize: "10px",
              width: "180px",
              overflow: "hidden",
            },
          }}
        />
      </Grid>

      {!image ? null : (
        <Grid item>
          <ImageIcon
            onClick={handleOpenDialog}
            color="primary"
            style={{
              cursor: "pointer",
            }}
          />
        </Grid>
      )}

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="image-dialog-title"
        aria-describedby="image-dialog-description"
      >
        <DialogTitle id="image-dialog-title">{label}</DialogTitle>
        <DialogContent>
          <img
            src={image}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ImageContainer;
