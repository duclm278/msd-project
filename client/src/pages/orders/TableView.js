import TableFull from "./TableFull";

const rows = [
    {
        id: 100,
        phone: "0123456789",
        name: "Quang",
        table: 1,
        eventName: "Magical July",
        reservedTime: "2022-07-01T00:00",
        money: 100000,
        status: "Canceled",
    },
    {
        id: 200,
        phone: "0123456789",
        name: "Giang",
        table: 2,
        eventName: "Magical July",
        reservedTime: "2022-07-01T00:00",
        money: 300000,
        status: "Paid",
    },
    {
        id: 300,
        phone: "0123456789",
        name: "Trung",
        table: 3,
        eventName: "Magical July",
        reservedTime: "2022-07-01T00:00",
        money: 200000,
        status: "Paid",
    },
];

const cols = [
  { field: "reservedTime", headerName: "RESERVED TIME" },
  { field: "name", headerName: "NAME" },
  { field: "phone", headerName: "PHONE" },
  { field: "table", headerName: "TABLE" },
  { field: "money", headerName: "MONEY" },
  { field: "status", headerName: "STATUS" },
  { field: "action", headerName: "" },
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
