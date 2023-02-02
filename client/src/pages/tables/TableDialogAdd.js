import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Custom
import { useState } from "react";
import { filterOpts } from ".";
import tableApi from "../../api/tableApi";
import status from "../../constants/status";

export default function TableDialogAdd({ open, setOpen }) {
  const [id, setId] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const [tableStatus, setTableStatus] = useState(filterOpts[0]);

  const handleSubmit = () => {
    console.log({ id, numberOfSeats, tableStatus });

    const submit = async () => {
      const response = await tableApi.createTable({
        id,
        numberOfSeats,
        tableStatus,
      });

      console.log(response);

      // TODO: Handle response
      if (response?.data?.type === status.error) {
        console.log("Error!");
      }

      if (response?.data?.type === status.success) {
        console.log("Success!");
      }
    };

    submit();
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose />
        <Typography
          component="h2"
          level="inherit"
          fontSize="1.25em"
          mb="0.25em"
        >
          Add new table
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            setOpen(false);
          }}
        >
          <Stack>
            <Stack spacing={2}>
              <FormControl required>
                <FormLabel>ID</FormLabel>
                <Input
                  name="id"
                  placeholder="ID"
                  autoFocus
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Capacity</FormLabel>
                <Input
                  name="capacity"
                  placeholder="Number of seats"
                  value={numberOfSeats}
                  onChange={(e) => setNumberOfSeats(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={tableStatus}
                  onChange={(e, newTableStatus) => {
                    setTableStatus(newTableStatus);
                  }}
                >
                  {filterOpts.map((filterOpt) => (
                    <Option key={filterOpt} value={filterOpt}>
                      {filterOpt}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Box mt={3} display="flex" gap={2} sx={{ width: "100%" }}>
              <Button type="submit" sx={{ flex: 1 }}>
                Save
              </Button>
            </Box>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
