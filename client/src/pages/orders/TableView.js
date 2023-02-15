import TableFull from "./TableFull";

const cols = [
    { field: "reserved_time", headerName: "RESERVED TIME" },
    { field: "customer_name", headerName: "NAME" },
    { field: "phone", headerName: "PHONE" },
    { field: "table_id", headerName: "TABLE" },
    { field: "total_cost", headerName: "TOTAL COST" },
    { field: "status", headerName: "STATUS" },
    { field: "action", headerName: "" },
];

export default function TableView({ data }) {
    return <TableFull rows={data} cols={cols} />;
}
