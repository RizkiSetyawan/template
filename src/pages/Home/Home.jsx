import React, { useState, createRef } from "react";

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
  const tableRef = createRef();
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
          }&page=${query.page + 1}&search=${query.search}`
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

  const addData = (data) => {
    return fetch(process.env.REACT_APP_SERVER_BINDING, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        refreshData();
        handleCloseForm()
      });
  };

  const updateData = () => {
    return (newData, oldData) =>
      new Promise(resolve => {
        fetch(`${process.env.REACT_APP_SERVER_BINDING}/${oldData.id_obu}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newData)
        })
          .then(res => res.json())
          .then(result => {
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
        rows={rows}
        open={openAction}
        onClose={handleCloseDialog}
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
    </div>
  );
};

export default Home;

