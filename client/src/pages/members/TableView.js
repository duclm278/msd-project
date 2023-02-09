import { useEffect, useState } from "react";
import TableFull from "./TableFull";
import TableMini from "./TableMini";
import customerApi from "../../api/customerApi";
const rows = [
    {
        id: 100,
        name: "Bill Gates",
        phone: "0123456789",
        points: "100",
        rank: "Bronze",
    },
    {
        id: 200,
        name: "Elon Musk",
        phone: "0123456789",
        points: "300",
        rank: "Diamond",
    },
    {
        id: 300,
        name: "Jeff Bezos",
        phone: "0123456789",
        points: "200",
        rank: "Gold",
    },
];

const cols = [
    { field: "edit", headerName: "" },
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "NAME" },
    { field: "phone", headerName: "PHONE" },
    { field: "points", headerName: "POINTS" },
    { field: "rank", headerName: "RANK" },
];

export default function TableView({ filterOpt }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // const fetchData = async () => {
    //     try {
    //       const response = await customerApi.searchByNameOrRank({
    //         name: "",
    //         rank:
    //       })
    //     } catch (err) {}
    // };

    useEffect(() => {}, []);

    let filterRows = rows;
    if (filterOpt !== null) {
        filterRows = rows.filter((row) => row.rank === filterOpt);
    }

    return (
        <>
            {data.length === 0 ? (
                "No customer!"
            ) : (
                <>
                    <TableMini rows={filterRows} />
                    <TableFull rows={filterRows} cols={cols} />{" "}
                </>
            )}
        </>
    );
}
