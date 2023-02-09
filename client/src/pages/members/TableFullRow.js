import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Custom
import { useState } from "react";
import MemberDialogEdit from "./MemberDialogEdit";

export default function TableFullRow({ data , setLoading, fetchData}) {
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <>
            <Box>
                <IconButton
                    size="md"
                    variant="plain"
                    color="neutral"
                    onClick={() => setOpenEdit(true)}
                    sx={{ color: "#fff" }}
                >
                    <EditOutlinedIcon color="primary" />
                </IconButton>
                <MemberDialogEdit
                    id={data.id}
                    name={data.name}
                    email={data.email}
                    phone={data.phone}
                    point={data.point}
                    rank={data.rank}
                    open={openEdit}
                    setOpen={setOpenEdit}
                    setLoading={setLoading}
                    fetchData={fetchData}
                />
            </Box>
            {/* <Stack justifyContent="center">
                <Typography level="body2">{data.id}</Typography>
            </Stack> */}
            <Stack justifyContent="center">
                <Typography level="body2">{data.name}</Typography>
            </Stack>
            <Stack justifyContent="center">
                <Typography level="body2">{data.phone}</Typography>
            </Stack>
            <Stack justifyContent="center">
                <Typography level="body2" sx={{ color: "success.400" }}>
                    {data.point}
                </Typography>
            </Stack>
            <Stack justifyContent="center">
                <Typography level="body2">{data.rank}</Typography>
            </Stack>
        </>
    );
}
