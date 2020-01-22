import React from "react";
import MaterialTable from 'material-table'

const Home = () => {
  return (
      <MaterialTable
        title="Actions On Selected Rows Preview"
        columns={[
          { title: "Name", field: "name" },
          { title: "Surname", field: "surname" },
          { title: "Birth Year", field: "birthYear", type: "numeric" },
          {
            title: "Birth Place",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
          }
        ]}
        data={[
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          {
            name: "Zerya Betül",
            surname: "Baran",
            birthYear: 2017,
            birthCity: 34
          }
        ]}
        options={{
          selection: true
        }}
        actions={[
          {
            tooltip: "Remove All Selected Users",
            icon: "delete",
            onClick: (evt, data) =>
              console.log(data)
          }
        ]}
      />
  );
};

export default Home;
