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

// Icons
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

// Custom
import { filterOpts } from ".";

export default function DialogTableEdit({
  name,
  capacity,
  status,
  open,
  setOpen,
}) {
  const handleSave = (e) => {
    // e.preventDefault();
    setOpen(() => false);
  };

  const handleDelete = (e) => {
    // e.preventDefault();
    setOpen(() => false);
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
          Edit table
        </Typography>
        <form>
          <Stack>
            <Stack spacing={2}>
              <TextField
                name="name"
                value={name}
                label="Name"
                placeholder="Name"
                autoFocus
                required
              />
              <TextField
                name="capacity"
                value={capacity}
                label="Capacity"
                placeholder="Number of seats"
                required
              />
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select defaultValue={status}>
                  <Option value={filterOpts[0]}>{filterOpts[0]}</Option>
                  <Option value={filterOpts[1]}>{filterOpts[1]}</Option>
                  <Option value={filterOpts[2]}>{filterOpts[2]}</Option>
                  <Option value={filterOpts[3]}>{filterOpts[3]}</Option>
                </Select>
              </FormControl>
            </Stack>
            <Box mt={3} display="flex" gap={2} sx={{ width: "100%" }}>
              <Button
                type="button"
                onClick={(e) => handleSave(e)}
                startDecorator={<SaveRoundedIcon />}
                sx={{ flex: 1 }}
              >
                Save
              </Button>
              <Button
                type="button"
                variant="soft"
                color=""
                onClick={(e) => handleDelete(e)}
                startDecorator={<DeleteForeverRoundedIcon />}
                sx={{ flex: 1 }}
              >
                Delete
              </Button>
            </Box>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
