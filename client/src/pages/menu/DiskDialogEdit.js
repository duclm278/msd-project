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
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";

// Icons
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

// Custom
import { useState } from "react";
import { diskOpts } from ".";

export default function DiskDialogEdit(props) {
  const { open, setOpen } = props;
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [price, setPrice] = useState(props.price);
  const [image, setImage] = useState(props.image);
  const [category, setCategory] = useState(props.category);

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
          width: "90%",
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
          Edit disk
        </Typography>
        <form>
          <Stack>
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
                  placeholder="This is a disk made with..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
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
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  value={category}
                  onChange={(e, newCategory) => setCategory(newCategory)}
                >
                  {diskOpts.map((filterOpt) => (
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
        </form>
      </ModalDialog>
    </Modal>
  );
}
