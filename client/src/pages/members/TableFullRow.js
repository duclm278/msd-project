import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function TableFullRow({ data }) {
  return (
    <>
      <Box>
        <IconButton
          size="md"
          variant="plain"
          color="neutral"
          // onClick={() => setOpenEdit(true)}
          sx={{ color: "#fff" }}
        >
          <EditOutlinedIcon color="primary" />
        </IconButton>
      </Box>
      <Stack justifyContent="center">
        <Typography level="body2">{data.id}</Typography>
      </Stack>
      <Stack justifyContent="center">
        <Typography level="body2">{data.name}</Typography>
      </Stack>
      <Stack justifyContent="center">
        <Typography level="body2">{data.phone}</Typography>
      </Stack>
      <Stack justifyContent="center">
        <Typography level="body2" sx={{ color: "success.400" }}>
          {data.points}
        </Typography>
      </Stack>
      <Stack justifyContent="center">
        <Typography level="body2">{data.rank}</Typography>
      </Stack>
    </>
  );
}
