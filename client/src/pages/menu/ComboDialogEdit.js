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

// Icons
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

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

export default function DiskDialogEdit(props) {
  const { open, setOpen } = props;
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [price, setPrice] = useState(props.price);
  const [image, setImage] = useState(props.image);
  const [diskList, setDiskList] = useState(data);
  const [openSubModal, setOpenSubModal] = useState(false);

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
          Edit combo
        </Typography>
        <Stack component="form">
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
