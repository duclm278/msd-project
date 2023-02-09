import Box from "@mui/joy/Box";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";

// Icons
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";

export default function TableMiniRow({ data }) {
  return (
    <ListItem>
      <ListItemButton variant="soft" sx={{ bgcolor: "transparent" }}>
        <ListItemContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography
              level="body2"
              startDecorator={<AssignmentIndRoundedIcon color="primary" />}
              sx={{ alignItems: "flex-start" }}
            >
              {data.name}
            </Typography>
            <Typography level="body2" sx={{ color: "success.400" }}>
              {data.point}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography level="body2">{data.phone}</Typography>
            <Typography level="body2">{data.rank}</Typography>
          </Box>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}
