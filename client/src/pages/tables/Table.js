import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

// Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
// Custom
import { useState } from "react";
import TableDialogEdit from "./TableDialogEdit";
import status from "../../constants/status";
import tableApi from "../../api/tableApi";
import Loading from "../../components/Loading";

export default function Table({ id, numberOfSeats, tableStatus, statusColor }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = (e) => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await tableApi.deleteTableById(id);

                if (response?.data?.type === status.success) {
                    setLoading(false);
                    alert(response?.data?.message);
                }
            } catch (err) {
                setLoading(false);
                alert(err.response.data.message);
            }
        };

        fetch();
        window.location.reload();
    };

    return (
        <>
            {loading && <Loading />}
            <Card
                variant="outlined"
                sx={{
                    "--Card-radius": (theme) => theme.vars.radius.sm,
                    boxShadow: "none",
                }}
            >
                <CardOverflow
                    sx={{
                        borderBottom: "1px solid",
                        borderColor: "neutral.outlinedBorder",
                    }}
                >
                    <AspectRatio ratio="2" color="primary">
                        <Typography
                            level="h3"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "primary.plainColor",
                            }}
                        >
                            {id}
                        </Typography>
                    </AspectRatio>
                </CardOverflow>
                <Box sx={{ pt: 2, display: "flex", alignItems: "center" }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography>Seats: {numberOfSeats}</Typography>
                        <Typography sx={{ color: statusColor }}>
                            {tableStatus}
                        </Typography>
                    </Box>
                    <IconButton
                        variant="plain"
                        color="neutral"
                        onClick={() => setOpenEdit(true)}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                        variant="plain"
                        color="danger"
                        onClick={handleDelete}
                    >
                        <DeleteOutlineRoundedIcon />
                    </IconButton>
                    <TableDialogEdit
                        id={id}
                        numberOfSeats={numberOfSeats}
                        tableStatus={tableStatus}
                        open={openEdit}
                        setOpen={setOpenEdit}
                    />
                </Box>
            </Card>
        </>
    );
}
