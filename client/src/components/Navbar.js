import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListSubheader from "@mui/joy/ListSubheader";
import React from "react";

// Icons import
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function Navbar() {
  return (
    <List size="sm" sx={{ "--List-item-radius": "8px", "--List-gap": "4px" }}>
      <ListItem nested>
        <ListSubheader>
          Browse
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
          <ListItem>
            <ListItemButton variant="soft" color="primary">
              <ListItemDecorator sx={{ color: "inherit" }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Tables</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Menu</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Events</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Members</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Report</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Orders</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
