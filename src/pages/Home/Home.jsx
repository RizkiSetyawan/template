import React, { useState, createRef, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import FormOnBoarding from "./components/FormOnBoarding";
import TableOnBoarding from "./components/TableOnBoarding";
import DialogAction from "./components/DialogAction";

import Alerts from "../../components/Alerts/Alerts";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "80%",
    maxHeight: 435
  }
}));

const Home = () => {
  const classes = useStyles();
  const tableRef = createRef();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { token } = authContext;

  const {
    openAlert,
    typeAlert,
    messageAlert,
    handleOpenAlert,
    handleCloseAlert
  } = alertContext;

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

  const handleOpenForm = () => {
    setState({
      ...state,
      openForm: true
    });
  };

  const handleCloseForm = () => {
    setState({
      ...state,
      openForm: false
    });
  };

  const refreshData = () => {
    tableRef.current && tableRef.current.onQueryChange();
  };

  const colorStatus = status => {
    if (status === "active") {
      return "primary";
    } else if (status === "blacklist") {
      return "secondary";
    } else {
      return;
    }
  };

  const getData = () => {
    return query =>
      new Promise(resolve => {
        fetch(
          `${process.env.REACT_APP_SERVER_BINDING}?limit=${
            query.pageSize
          }&page=${query.page + 1}&search=${query.search}`,
          {
            headers: {
              Authentication: token
            }
          }
        )
          .then(res => res.json())
          .then(result => {
            resolve({
              data: result.data.rows, // your data array
              page: Number(result.data.page - 1), // current page number
              totalCount: Number(result.data.total) // total value
            });
          });
      });
  };

  const addData = data => {
    return fetch(process.env.REACT_APP_SERVER_BINDING, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: token
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        refreshData();
        handleCloseForm();
        handleOpenAlert(
          result.status,
          result.message
            ? result.message
            : `menambahkan ID OBU ${result.data.id_obu} status ${result.data.status}`
        );
      });
  };

  const updateData = () => {
    return (newData, oldData) =>
      new Promise(resolve => {
        fetch(`${process.env.REACT_APP_SERVER_BINDING}/${oldData.id_obu}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authentication: token
          },
          body: JSON.stringify(newData)
        })
          .then(res => res.json())
          .then(result => {
            handleOpenAlert(
              result.status,
              result.message
                ? result.message
                : `ID OBU ${result.data.id_obu} status ${result.data.status}`
            );
            resolve(refreshData());
          });
      });
  };

  return (
    <div>
      <DialogAction
        classes={{
          paper: classes.paper
        }}
        keepMounted
        token={token}
        rows={rows}
        open={openAction}
        onClose={handleCloseDialog}
        handleOpenAlert={handleOpenAlert}
        refreshData={refreshData}
      />
      <TableOnBoarding
        handleOpenForm={handleOpenForm}
        handleOpenAction={handleOpenAction}
        tableRef={tableRef}
        colorStatus={colorStatus}
        getData={getData}
        updateData={updateData}
      />
      <FormOnBoarding
        open={openForm}
        handleClose={handleCloseForm}
        addData={addData}
      />
      <Alerts
        open={openAlert}
        handleOpenAlert={handleOpenAlert}
        handleCloseAlert={handleCloseAlert}
        typeAlert={typeAlert}
        messageAlert={messageAlert}
      />
    </div>
  );
};

export default Home;
