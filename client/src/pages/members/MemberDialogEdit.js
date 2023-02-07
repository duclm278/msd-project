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

// Icons
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

// Custom
import { useState } from "react";
import { filterOpts } from ".";

export default function MemberDialogAdd(props) {
  const { open, setOpen } = props;
  const [id, setId] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [phone, setPhone] = useState(props.phone);
  const [points, setPoints] = useState(props.points);
  const [rank, setRank] = useState(props.rank);

  const handleSave = (e) => {
    e.preventDefault();
    setOpen(() => false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setOpen(() => false);
  };

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
        <Stack component="form">
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
              color="danger"
              onClick={(e) => handleDelete(e)}
              startDecorator={<DeleteForeverRoundedIcon />}
              sx={{ flex: 1 }}
            >
              Delete
            </Button>
          </Box>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
