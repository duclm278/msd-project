import TableFull from "./TableFull";
import TableMini from "./TableMini";

const cols = [
  { field: "name", headerName: "NAME" },
  { field: "phone", headerName: "PHONE" },
  { field: "point", headerName: "POINT" },
  { field: "rank", headerName: "RANK" },
  { field: "action", headerName: "" },
];

export default function TableView({ data, setLoading, fetchData }) {
  return (
    <>
      <TableMini rows={data} setLoading={setLoading} fetchData={fetchData} />
      <TableFull
        rows={data}
        cols={cols}
        setLoading={setLoading}
        fetchData={fetchData}
      />
    </>
  );
}
