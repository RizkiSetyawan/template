import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import FormOnBoarding from "./components/FormOnBoarding"
import TableOnBoarding from "./components/TableOnBoarding"
import DialogAction from "./components/DialogAction";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "80%",
    maxHeight: 435
  }
}));

const Home = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    rows: [],
    openAction: false,
    openForm: false
  });
  const { openAction, openForm, rows } = state;

  const handleOpenAction = rows => {
    setState({
      ...state,
      rows,
      openAction: true
    });
  };

  const handleCloseDialog = () => {
    setState({
      ...state,
      openAction: false
    });
  };

  const handleGetData = (data) => {
    setState({ ...state, data });
  }

  const handleOpenForm = () => {
    setState({
      ...state,
      openForm: true
    });
  }

  const handleCloseForm = () => {
    setState({
      ...state,
      openForm: false
    });
  }

  return (
    <div>
      <DialogAction
        classes={{
          paper: classes.paper
        }}
        keepMounted
        rows={rows}
        open={openAction}
        onClose={handleCloseDialog}
      />
      <TableOnBoarding
        handleOpenForm={handleOpenForm}
        handleOpenAction={handleOpenAction}
        handleGetData={handleGetData}
      />
      <FormOnBoarding
        open={openForm}
        handleClose={handleCloseForm}
      />
    </div>
  );
};

export default Home;

