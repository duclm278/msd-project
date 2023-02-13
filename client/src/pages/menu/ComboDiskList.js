import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

// Custom
import React from "react";

export default function ComboDiskList({
  diskList,
  setDiskList,
  setSelectedDisks,
}) {
  return (
    <Stack py={2} spacing={2}>
      {diskList.map((diskItem, index) => (
        <React.Fragment key={index}>
          <FormControl>
            <FormLabel>{diskItem.disk_name}</FormLabel>
            <Typography level="body3">
              Price: {diskItem.price.toLocaleString()}đ
            </Typography>
            <Stack direction="row" alignItems="end" spacing={1}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  pt: 1,
                  borderTop: "1px solid",
                  borderColor: "background.level2",
                }}
              >
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={() => {
                    setDiskList((prevList) => [
                      ...prevList.map((item, i) =>
                        i === index
                          ? {
                              ...item,
                              quantity: Math.max(0, item.quantity - 1),
                            }
                          : item
                      ),
                    ]);
                    if (setSelectedDisks)
                      setSelectedDisks((prev) => {
                        const itemIndex = prev.findIndex(
                          (diskSelected) => diskSelected.id === diskItem.disk_id
                        );
                        if (itemIndex >= 0) {
                          if (prev[itemIndex].quantity === 1) {
                            return prev.filter(
                              (i) => i.id !== diskItem.disk_id
                            );
                          }
                          prev[itemIndex].quantity =
                            prev[itemIndex].quantity - 1;
                        }
                        return prev;
                      });
                  }}
                >
                  <RemoveRoundedIcon />
                </IconButton>
                <Typography fontWeight="md" textColor="text.secondary">
                  {diskItem.quantity}
                </Typography>
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={() => {
                    setDiskList((prevList) => [
                      ...prevList.map((item, i) =>
                        i === index
                          ? {
                              ...item,
                              quantity: item.quantity + 1,
                            }
                          : item
                      ),
                    ]);
                    if (setSelectedDisks)
                      setSelectedDisks((prev) => {
                        const itemIndex = prev.findIndex(
                          (diskSelected) => diskSelected.id === diskItem.disk_id
                        );

                        if (itemIndex < 0) {
                          return [
                            ...prev,
                            {
                              id: diskItem.disk_id,
                              quantity: 1,
                            },
                          ];
                        } else {
                          prev[itemIndex].quantity =
                            prev[itemIndex].quantity + 1;

                          return prev;
                        }
                      });
                  }}
                >
                  <AddRoundedIcon />
                </IconButton>
              </Box>

              <Box sx={{ pr: 2, mr: 3 }}>
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={() => {
                    setDiskList((prevList) => [
                      ...prevList.map((item, i) =>
                        i === index
                          ? {
                              ...item,
                              quantity: 0,
                            }
                          : item
                      ),
                    ]);
                    if (setSelectedDisks)
                      setSelectedDisks((prev) => {
                        const itemIndex = prev.findIndex(
                          (diskSelected) => diskSelected.id === diskItem.disk_id
                        );

                        if (itemIndex < 0) {
                          return [
                            ...prev,
                            {
                              id: diskItem.disk_id,
                              quantity: 1,
                            },
                          ];
                        } else {
                          prev[itemIndex].quantity =
                            prev[itemIndex].quantity + 1;

                          return prev;
                        }
                      });
                  }}
                >
                  <RefreshRoundedIcon />
                </IconButton>
              </Box>
            </Stack>
          </FormControl>
        </React.Fragment>
      ))}
    </Stack>
  );
}
