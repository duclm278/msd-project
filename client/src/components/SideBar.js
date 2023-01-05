import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListSubheader from "@mui/joy/ListSubheader";

// Icons
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

// Custom
import { NavLink } from "react-router-dom";

function SideItem({ text, path, icon: ListItemIcon }) {
  return (
    <NavLink to={path} style={{ textDecoration: "none" }}>
      {({ isActive }) =>
        isActive ? (
          <ListItem>
            <ListItemButton variant="soft" color="primary">
              <ListItemDecorator sx={{ color: "inherit" }}>
                <ListItemIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>{text}</ListItemContent>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <ListItemIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>{text}</ListItemContent>
            </ListItemButton>
          </ListItem>
        )
      }
    </NavLink>
  );
}

export default function SideBar() {
  return (
    <List
      size="sm"
      sx={{
        "--List-item-radius": "8px",
        "--List-gap": "4px",
        position: "sticky",
        top: 64, // TODO: Fix hard code
        zIndex: 1100,
      }}
    >
      <ListItem nested>
        <ListSubheader>
          Main
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px", ml: "auto" }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <SideItem
            text="Tables"
            path="/tables"
            icon={AssignmentIndRoundedIcon}
          />
          <SideItem text="Menu" path="/menu" icon={AssignmentIndRoundedIcon} />
          <SideItem
            text="Orders"
            path="/orders"
            icon={AssignmentIndRoundedIcon}
          />
        </List>
      </ListItem>
      <ListItem nested sx={{ mt: 2 }}>
        <ListSubheader>
          Others
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px", ml: "auto" }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <SideItem
            text="Events"
            path="/events"
            icon={AssignmentIndRoundedIcon}
          />
          <SideItem
            text="Members"
            path="/members"
            icon={AssignmentIndRoundedIcon}
          />
          <SideItem
            text="Report"
            path="/report"
            icon={AssignmentIndRoundedIcon}
          />
        </List>
      </ListItem>
    </List>
  );
}
