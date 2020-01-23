import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

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
    openDialog: false
  });
  const { openDialog, rows } = state;

  const handleOpenDialog = rows => {
    setState({
      ...state,
      rows,
      openDialog: true
    });
  };

  const handleCloseDialog = () => {
    setState({
      ...state,
      openDialog: false
    });
  };

  const handleGetData = (data) => {
    setState({ ...state, data });
  }

  return (
    <div>
      <DialogAction
        classes={{
          paper: classes.paper
        }}
        keepMounted
        rows={rows}
        open={openDialog}
        onClose={handleCloseDialog}
      />
      <TableOnBoarding
        handleOpenDialog={handleOpenDialog}
        handleGetData={handleGetData}
      />
    </div>
  );
};

export default Home;

