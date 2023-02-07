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

export default function MemberDialogAdd({ open, setOpen }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [points, setPoints] = useState("");
  const [rank, setRank] = useState(filterOpts[0]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        sx={{
          width: 350,
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
          onSubmit={(e) => {
            // TODO: Update changes
            e.preventDefault();
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
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Points</FormLabel>
                <Input
                  name="points"
                  placeholder="Points"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={rank}
                  onChange={(e, newRank) => {
                    setRank(newRank);
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
