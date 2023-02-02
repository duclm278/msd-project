import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

// Custom
import React from "react";
import Disk from "./Disk";

export default function DiskGroup({ category }) {
  return (
    <>
      <Box
        sx={{
          pt: 2,
          bgcolor: "background.surface",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight="bold" level="h4" component="h2">
          {category}
        </Typography>
      </Box>
      <Box
        sx={{
          my: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(160px, 1fr))",
            sm: "repeat(auto-fill, minmax(180px, 1fr))",
            md: "repeat(auto-fill, minmax(200px, 1fr))",
          },
          gap: 3,
        }}
      >
        {[...Array(10).keys()].map((index) => (
          <React.Fragment key={index}>
            <Disk
              name="Fried Rice"
              description="This is fried rice."
              price={150000}
              image="https://images.unsplash.com/photo-1512058564366-18510be2db19?fm=jpg"
              category={category}
            />
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}
