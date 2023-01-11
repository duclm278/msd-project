import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

// Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Custom
import { useState } from "react";
import DialogTableEdit from "./DialogTableEdit";

export default function Table({ name, capacity, status }) {
  const [openEdit, setOpenEdit] = useState(false);

  return (
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
            {name}
          </Typography>
        </AspectRatio>
      </CardOverflow>
      <Box sx={{ pt: 2, display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          <Typography>Seats: {capacity}</Typography>
          <Typography color="success">{status}</Typography>
        </Box>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpenEdit(true)}
        >
          <EditOutlinedIcon />
        </IconButton>
        <DialogTableEdit
          name={name}
          capacity={capacity}
          status={status}
          open={openEdit}
          setOpen={setOpenEdit}
        />
      </Box>
    </Card>
  );
}
