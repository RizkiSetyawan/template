import React from "react";
import moment from "moment";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";

const TableOnBoarding = props => {
  const {
    handleOpenAction,
    handleOpenForm,
    tableRef,
    colorStatus,
    getData,
    updateData
  } = props;

  return (
    <MaterialTable
      title="List On Boarding"
      tableRef={tableRef}
      columns={[
        { title: "Nama", field: "nama", editable: "never" },
        { title: "ID OBU", field: "id_obu", editable: "never" },
        { title: "No HP", field: "no_hp", editable: "never" },
        { title: "No Kendaraan", field: "plat_no", editable: "never" },
        { title: "Golongan", field: "gol", editable: "never" },
        {
          title: "Created at",
          field: "created_at",
          editable: "never",
          render: row => moment(row.created_at).format("DD-MM-YYYY")
        },
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
        selection: true,
        paginationType: "stepped",
        pageSize: 5,
        pageSizeOptions: [5, 10, 20]
      }}
      actions={[
        {
          icon: "add_box",
          tooltip: "Add",
          isFreeAction: true,
          onClick: () => handleOpenForm()
        },
        {
          tooltip: "Actions",
          icon: "edit",
          onClick: (evt, data) => handleOpenAction(data)
        }
      ]}
    />
  );
};

export default TableOnBoarding;
