import React, { createRef } from "react";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";

const TableOnBoarding = ({ handleOpenDialog, handleGetData }) => {
  const tableRef = createRef();

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
      new Promise((resolve, reject) => {
        fetch(
          `http://localhost:8001/api/binding?limit=${
            query.pageSize
          }&page=${query.page + 1}&search=${query.search}`
        )
          .then(res => res.json())
          .then(result => {
            handleGetData(result[0].data);
            resolve({
              data: result[0].rows, // your data array
              page: Number(result[0].page - 1), // current page number
              totalCount: Number(result[0].total) // total value
            });
          });
      });
  };

  const updateData = () => {
    return (newData, oldData) =>
      new Promise(resolve => {
        fetch(`http://localhost:8001/api/barang/${oldData.id_obu}`, {
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
    <MaterialTable
      title="List On Boarding"
      tableRef={tableRef}
      columns={[
        { title: "ID OBU", field: "id_obu", editable: "never" },
        { title: "No HP", field: "no_hp", editable: "never" },
        { title: "No Kendaraan", field: "no_kend", editable: "never" },
        { title: "Golongan", field: "gol", editable: "never" },
        { title: "Created at", field: "created_at", editable: "never" },
        {
          title: "Status",
          field: "status",
          lookup: {
            active: "active",
            "not-active": "not-active",
            blacklist: "blacklist"
          },
          render: row => (
            <Chip label={row.status} color={colorStatus(row.status)} />
          )
        }
      ]}
      data={getData()}
      editable={{
        onRowUpdate: updateData()
      }}
      options={{
        actionsColumnIndex: -1,
        selection: true
      }}
      actions={[
        {
          icon: "add",
          tooltip: "Add",
          isFreeAction: true,
          onClick: () => alert('saya tamvan')
        },
        {
          tooltip: "Actions",
          icon: "edit",
          onClick: (evt, data) => handleOpenDialog(data)
        }
      ]}
    />
  );
};

export default TableOnBoarding;
