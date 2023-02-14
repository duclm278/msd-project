import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Icons
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

// Custom
import React from "react";

export default function OrderListSelected({
  comboList,
  setComboList,
  diskList,
  setDiskList,
}) {
  let selectedList = [];
  comboList.forEach((comboItem) => {
    if (comboItem.quantity > 0) {
      selectedList.push(comboItem);
    }
  });
  diskList.forEach((diskItem) => {
    if (diskItem.quantity > 0) {
      selectedList.push(diskItem);
    }
  });
  const COMBO_CATEGORY = !comboList || comboList[0].category;

  return (
    <>
      {selectedList.length > 0 && (
        <Stack width={225}>
          <Typography level="h5" fontWeight="bold" textColor="text.secondary">
            Selected
          </Typography>
          <Stack py={2} spacing={2}>
            {selectedList
              .filter((item) => item.quantity > 0)
              .map((item, index) => (
                <React.Fragment key={index}>
                  <FormControl>
                    <FormLabel>{item.name}</FormLabel>
                    <Typography level="body3">
                      Price: {item.price.toLocaleString()}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        pt: 1,
                        pr: 2,
                        mr: 3,
                        borderTop: "1px solid",
                        borderColor: "background.level2",
                      }}
                    >
                      <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={() => {
                          if (item.category === COMBO_CATEGORY) {
                            setComboList((comboList) => [
                              ...comboList.map((comboItem, i) =>
                                comboItem.id === item.id
                                  ? {
                                      ...comboItem,
                                      quantity: comboItem.quantity - 1,
                                    }
                                  : comboItem
                              ),
                            ]);
                          } else {
                            setDiskList((diskList) => [
                              ...diskList.map((diskItem, i) =>
                                diskItem.id === item.id
                                  ? {
                                      ...diskItem,
                                      quantity: diskItem.quantity - 1,
                                    }
                                  : diskItem
                              ),
                            ]);
                          }
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography fontWeight="md" textColor="text.secondary">
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={() => {
                          if (item.category === COMBO_CATEGORY) {
                            setComboList((comboList) => [
                              ...comboList.map((comboItem, i) =>
                                comboItem.id === item.id
                                  ? {
                                      ...comboItem,
                                      quantity: comboItem.quantity + 1,
                                    }
                                  : comboItem
                              ),
                            ]);
                          } else {
                            setDiskList((diskList) => [
                              ...diskList.map((diskItem, i) =>
                                diskItem.id === item.id
                                  ? {
                                      ...diskItem,
                                      quantity: diskItem.quantity + 1,
                                    }
                                  : diskItem
                              ),
                            ]);
                          }
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </FormControl>
                </React.Fragment>
              ))}
          </Stack>
        </Stack>
      )}
    </>
  );
}
