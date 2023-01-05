import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";

// Custom
import { filterOpts } from ".";

export default function DialogTableAdd({ open, setOpen }) {
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
          onSubmit={(event) => {
            // TODO: Update changes
            event.preventDefault();
            setOpen(false);
          }}
        >
          <Stack>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Name"
                placeholder="Name"
                autoFocus
                required
              />
              <TextField
                name="capacity"
                label="Capacity"
                placeholder="Number of seats"
                required
              />
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select defaultValue={filterOpts[0]}>
                  <Option value={filterOpts[0]}>{filterOpts[0]}</Option>
                  <Option value={filterOpts[1]}>{filterOpts[1]}</Option>
                  <Option value={filterOpts[2]}>{filterOpts[2]}</Option>
                  <Option value={filterOpts[3]}>{filterOpts[3]}</Option>
                </Select>
              </FormControl>
            </Stack>
            <Box mt={3} display="flex" gap={2} sx={{ width: "100%" }}>
              <Button type="submit" sx={{ flex: 1 }}>
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
