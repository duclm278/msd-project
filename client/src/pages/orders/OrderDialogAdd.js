import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function MemberDialogAdd({ open, setOpen }) {
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
          Add new member
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
              <FormControl required>
                <FormLabel>Name</FormLabel>
                <Input name="name" placeholder="Name" autoFocus />
              </FormControl>
              <FormControl required>
                <FormLabel>Phone</FormLabel>
                <Input name="phone" placeholder="Phone" />
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
