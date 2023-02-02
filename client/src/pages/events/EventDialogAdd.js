import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";

// Custom
import { useState } from "react";

export default function EventDialogAdd({ open, setOpen }) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString().replace(/:\d{2}.\d{3}Z$/, "");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [discount, setDiscount] = useState("");
  const [beginTime, setBeginTime] = useState(today);
  const [endTime, setEndTime] = useState(today);

  const handleSubmit = () => {
    // TODO: Handle response
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        sx={{
          width: "90%",
          maxHeight: "95vh",
          overflowY: "auto",
          maxWidth: 450,
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
          Add new event
        </Typography>
        <Stack
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            setOpen(false);
          }}
        >
          <Stack spacing={2}>
            <FormControl required>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Desc.</FormLabel>
              <Textarea
                name="description"
                minRows={2}
                maxRows={2}
                placeholder="This is an event featuring..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl required>
              <FormLabel>Discount</FormLabel>
              <Input
                name="discount"
                placeholder="50000"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </FormControl>
            <TextField
              required
              label="Start Time"
              type="datetime-local"
              value={beginTime}
              onChange={(e) => setBeginTime(e.target.value)}
            />
            <TextField
              required
              label="Close Time"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                name="image"
                placeholder="Image"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
              />
            </FormControl>
          </Stack>

          <Box mt={3} display="flex" gap={2}>
            <Button type="submit" sx={{ flex: 1 }}>
              Save
            </Button>
          </Box>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
