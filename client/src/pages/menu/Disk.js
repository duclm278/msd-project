import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

// Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Custom
import { useState } from "react";
import DiskDialogEdit from "./DiskDialogEdit";

export default function Disk({
    id,
    name,
    description,
    price,
    image,
    category,
    fetchData,
    setLoading,
}) {
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <Card
            sx={{
                "--Card-radius": (theme) => theme.vars.radius.sm,
                boxShadow: "none",
                aspectRatio: "4 / 3",
            }}
        >
            {image && (
                <CardCover>
                    <img alt="" src={image} />
                </CardCover>
            )}
            <CardCover
                sx={{
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.12))",
                }}
            />
            <CardContent
                sx={{
                    mt: "auto",
                    flexGrow: 0,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography textColor="#fff">{name}</Typography>
                    <Typography
                        level="body3"
                        mt={0.5}
                        textColor="rgba(255,255,255,0.72)"
                    >
                        Price: {price.toLocaleString()} đ
                    </Typography>
                </Box>
                <IconButton
                    variant="plain"
                    color="neutral"
                    onClick={() => setOpenEdit(true)}
                    sx={{ color: "#fff" }}
                >
                    <EditOutlinedIcon />
                </IconButton>
                <DiskDialogEdit
                    id={id}
                    name={name}
                    description={description}
                    price={price}
                    image={image}
                    category={category}
                    open={openEdit}
                    setOpen={setOpenEdit}
                    fetchData={fetchData}
                    setLoading={setLoading}
                />
            </CardContent>
        </Card>
    );
}
