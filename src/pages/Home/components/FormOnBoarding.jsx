import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: "100%"
  }
}));

export default function FormOnBoarding(props) {
  const { open, handleClose, addData } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    nama: "",
    no_hp: "",
    id_obu: "",
    plat_no: "",
    gol: "I",
    created_at: "",
    status: "active"
  });

  const { nama, no_hp, id_obu, plat_no, status, gol } = state;

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addData(state);
    setState({
      nama: "",
      no_hp: "",
      id_obu: "",
      plat_no: "",
      gol: "I",
      created_at: "",
      status: "active"
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={onSubmit}>
          <DialogTitle id="form-dialog-title">Add On Boarding</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="nama"
                  name="nama"
                  label="Nama"
                  value={nama}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="id_obu"
                  name="id_obu"
                  label="ID OBU"
                  value={id_obu}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="no_hp"
                  name="no_hp"
                  label="No Handphone"
                  value={no_hp}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="plat_no"
                  name="plat_no"
                  label="No Kendaraan"
                  value={plat_no}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="gol">Golongan</InputLabel>
                  <Select
                    labelId="gol"
                    id="gol"
                    name="gol"
                    value={gol}
                    onChange={onChange}
                  >
                    <MenuItem value={"I"}>I</MenuItem>
                    <MenuItem value={"II"}>II</MenuItem>
                    <MenuItem value={"III"}>III</MenuItem>
                    <MenuItem value={"IV"}>IV</MenuItem>
                    <MenuItem value={"V"}>V</MenuItem>
                    <MenuItem value={"VI"}>VI</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="status"
                    value={status}
                    onChange={onChange}
                  >
                    <MenuItem value={"active"}>active</MenuItem>
                    <MenuItem value={"not-active"}>not-active</MenuItem>
                    <MenuItem value={"blacklist"}>blacklist</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
