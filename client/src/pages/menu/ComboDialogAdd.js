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

// Custom
import { useState } from "react";
import ComboDiskList from "./ComboDiskList";

// TODO: Fetch data from API
const data = Array.from({ length: 15 }, () => ({
  name: "Fried Rice",
  price: 150000,
  image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?fm=jpg",
  category: "Main Menu",
  quantity: 0,
}));

export default function ComboDialogAdd({ open, setOpen }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [diskList, setDiskList] = useState(data);
  const [openSubModal, setOpenSubModal] = useState(false);

  const handleSubmit = () => {
    // TODO: Handle response
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
          Add new combo
        </Typography>
        <Stack
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            setOpen(false);
          }}
        >
          <Stack direction="row" spacing={4}>
            <Stack className="col-1" flexGrow={1}>
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
                    placeholder="This is a combo composed of..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>
                    {"Price (Original: "}
                    {diskList
                      .reduce((sum, cur) => sum + cur.price * cur.quantity, 0)
                      .toLocaleString()}
                    {")"}
                  </FormLabel>
                  <Input
                    name="price"
                    placeholder="Combo price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ display: { xs: "flex", sm: "none" } }}>
                  <FormLabel>Disks</FormLabel>
                  <Button
                    variant="outlined"
                    onClick={() => setOpenSubModal(true)}
                  >
                    Select disks
                  </Button>
                  <Modal
                    open={openSubModal}
                    onClose={() => setOpenSubModal(false)}
                  >
                    <ModalDialog layout="fullscreen">
                      <ModalClose />
                      <Typography component="h2" fontSize="1.25em">
                        Select disks
                      </Typography>
                      <Stack
                        py={2}
                        sx={{ maxHeight: "100%", overflow: "auto" }}
                      >
                        <ComboDiskList
                          diskList={diskList}
                          setDiskList={setDiskList}
                        />
                      </Stack>
                    </ModalDialog>
                  </Modal>
                </FormControl>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input
                    name="image"
                    placeholder="Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </Stack>

            <Stack
              className="col-2"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Box flexBasis={0} flexGrow={1} sx={{ overflow: "auto" }}>
                <ComboDiskList diskList={diskList} setDiskList={setDiskList} />
              </Box>
            </Stack>
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
