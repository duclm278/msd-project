import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

// Custom
import React from "react";
import Combo from "./Combo";

export default function ComboGroup() {
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
          Combo
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
            <Combo
              name="Fried Rice"
              description="This is fried rice."
              price={150000}
              image="https://images.unsplash.com/photo-1512058564366-18510be2db19?fm=jpg"
            />
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}
