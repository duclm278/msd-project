import TableFull from "./TableFull";

const rows = [
  {
    id: 100,
    phone: "0123456789",
    table: 1,
    money: 100000,
    status: "Canceled",
  },
  {
    id: 200,
    phone: "0123456789",
    table: 2,
    money: 300000,
    status: "Paid",
  },
  {
    id: 300,
    phone: "0123456789",
    table: 3,
    money: 200000,
    status: "Paid",
  },
];

const cols = [
  { field: "edit", headerName: "" },
  { field: "no", headerName: "NO." },
  { field: "id", headerName: "ID" },
  { field: "phone", headerName: "PHONE" },
  { field: "table", headerName: "TABLE" },
  { field: "money", headerName: "MONEY" },
  { field: "status", headerName: "STATUS" },
];

export default function TableView({ filterOpt }) {
  let filterRows = rows;
  if (filterOpt !== null) {
    filterRows = rows.filter((row) => row.rank === filterOpt);
  }

  return (
    <>
      <TableFull rows={filterRows} cols={cols} />
    </>
  );
}
