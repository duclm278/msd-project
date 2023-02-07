import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Custom
import { useState } from "react";
import OrderDialogEdit from "./OrderDialogEdit";

export default function TableFullRow({ no, data }) {
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
        <OrderDialogEdit
          id={data.id}
          phone={data.phone}
          table={data.table}
          eventName={data.eventName}
          reservedTime={data.reservedTime}
          open={openEdit}
          setOpen={setOpenEdit}
        />
      </Box>
      <Stack justifyContent="center">
        <Typography level="body2">{no}</Typography>
      </Stack>
      <Stack justifyContent="center">
        <Typography level="body2">{data.id}</Typography>
      </Stack>
      <Stack justifyContent="center">
        <Typography level="body2">{data.phone}</Typography>
      </Stack>
      <Stack justifyContent="center">
        <Typography level="body2">{data.table}</Typography>
      </Stack>
      <Stack justifyContent="center">
        <Typography level="body2">{data.money.toLocaleString()}</Typography>
      </Stack>
      <Stack justifyContent="center">
        {data.status === "Paid" ? (
          <Typography level="body2" sx={{ color: "success.300" }}>
            {data.status}
          </Typography>
        ) : (
          <Typography level="body2" sx={{ color: "danger.400" }}>
            {data.status}
          </Typography>
        )}
      </Stack>
    </>
  );
}
