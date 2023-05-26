import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Popover,
  IconButton,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import withStyles from "@mui/styles/withStyles";
import FormDialog from "../../../shared/components/FormDialog";
import { deleteAccount } from "../../../DB/db";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

function AddDialog(props) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const deleteAccounts = async () => {
    const id = props.props.idCuentaBancaria;

    const result = await deleteAccount({
      id: id,
    });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
            },
          }),
        }}
      >
        <DeleteForeverIcon sx={{ color: "#000" }} />
      </IconButton>
      <Popover open={Boolean(open)} onClose={handleClose}>
        <Fragment>
          <FormDialog
            open
            onClose={handleClose}
            hideBackdrop
            onFormSubmit={(e) => {
              e.preventDefault();
              deleteAccount();
              handleClose();
            }}
            headline="Eliminar cuenta bancaria"
            content={
              <Fragment>
                <Typography paragraph>
                  Si continua su cuenta y todos sus datos serán eliminados
                  ¿Desea continuar?
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Usuario"
                  InputProps={{
                    readOnly: true,
                  }}
                  type="text"
                  defaultValue={props.props.idCuentaBancaria}
                />
              </Fragment>
            }
            actions={
              <Fragment>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Eliminar
                </Button>
              </Fragment>
            }
          />
        </Fragment>
      </Popover>
    </>
  );
}

AddDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default withRouter(withStyles(styles)(AddDialog));
