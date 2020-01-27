import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function ConfirmationDialogRaw(props) {
  const { token, onClose, open, rows, refreshData, handleOpenAlert, ...other } = props;
  const radioGroupRef = React.useRef(null);

  const [value, setValue] = React.useState("active");

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    let data = rows.map(row => {
      return { id: row.id_obu, status: value };
    });
    return fetch(`${process.env.REACT_APP_SERVER_BINDING}/ums`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authentication": token
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        refreshData();
        onClose();
        handleOpenAlert(
          result.status,
          result.message
            ? result.message
            : `ID OBU ${result.data.rows} status ${result.data.status}`
        );
      });
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Action</DialogTitle>
      <DialogContent dividers>
        <div style={{ marginBottom: "15px" }}>
          {rows.map((row, i) => (
            <Chip key={i} label={row.id_obu} variant="outlined" />
          ))}
        </div>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="action"
          name="action"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="active"
            key="active"
            control={<Radio />}
            label="Active"
          />
          <FormControlLabel
            value="not-active"
            key="not-active"
            control={<Radio />}
            label="Not-Active"
          />
          <FormControlLabel
            value="blacklist"
            key="blacklist"
            control={<Radio />}
            label="Black List"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ConfirmationDialogRaw;
