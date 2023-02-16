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
  const handleIncrease = (id, list, setList) => {
    setList((prev) => {
      const index = list.findIndex((item) => item.id === id);
      prev[index].quantity += 1;
      return [...prev];
    });
  };

  const handleDecrease = (id, list, setList) => {
    setList((prev) => {
      const index = list.findIndex((item) => item.id === id);
      if (prev[index].quantity !== 0) {
        prev[index].quantity -= 1;
      }
      return [...prev];
    });
  };

  return (
    <>
      {comboList.length + diskList.length > 0 && (
        <Stack>
          <Stack py={2} spacing={2}>
            {comboList.length > 0 && (
              <>
                <Typography
                  level="h6"
                  fontWeight="bold"
                  textColor="text.secondary"
                >
                  Combo{comboList.length > 1 ? "s" : ""}
                </Typography>
                {comboList.map((item) => (
                  <React.Fragment key={item.id}>
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
                          onClick={() =>
                            handleDecrease(item.id, comboList, setComboList)
                          }
                        >
                          <Remove />
                        </IconButton>
                        <Typography fontWeight="md" textColor="text.secondary">
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="sm"
                          variant="outlined"
                          onClick={() =>
                            handleIncrease(item.id, comboList, setComboList)
                          }
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </FormControl>
                  </React.Fragment>
                ))}
              </>
            )}
            {diskList.length > 0 && (
              <>
                <Typography
                  level="h6"
                  fontWeight="bold"
                  textColor="text.secondary"
                >
                  Disk{diskList.length > 1 ? "s" : ""}
                </Typography>
                {diskList.map((item) => (
                  <React.Fragment key={item.id}>
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
                          onClick={() =>
                            handleDecrease(item.id, diskList, setDiskList)
                          }
                        >
                          <Remove />
                        </IconButton>
                        <Typography fontWeight="md" textColor="text.secondary">
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="sm"
                          variant="outlined"
                          onClick={() =>
                            handleIncrease(item.id, diskList, setDiskList)
                          }
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </FormControl>
                  </React.Fragment>
                ))}
              </>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}
