import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

const ConfirmDialog = ({
  openConfirmDialog,
  setOpenConfirmDialog,
  confirmFunction,
  dialogTitle,
  dialogText,
}) => {
  const confirmButton = () => {
    confirmFunction();
    handleClose();
  };

  const handleClose = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openConfirmDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abort</Button>
          <Button onClick={confirmButton}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmDialog.propTypes = {
  openConfirmDialog: PropTypes.bool,
  setOpenConfirmDialog: PropTypes.func,
  confirmFunction: PropTypes.func,
  dialogTitle: PropTypes.string,
  dialogText: PropTypes.string,
};

export default ConfirmDialog;
