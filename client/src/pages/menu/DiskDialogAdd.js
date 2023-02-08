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

// Custom
import { AspectRatio } from "@mui/joy";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { diskOpts } from ".";
import diskApi from "../../api/diskApi";
import status from "../../constants/status";

export default function DiskDialogAdd({
  open,
  setOpen,
  setLoading,
  fetchData,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(undefined);
  const [category, setCategory] = useState(diskOpts[0]);
  const [preview, setPreview] = useState();
  const { enqueueSnackbar } = useSnackbar();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await diskApi.create({
        name,
        image,
        category,
        price,
        description,
      });

      if (response?.data?.type === status.success) {
        enqueueSnackbar(response.data.message, {
          variant: "success",
        });
        fetchData();
      }
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
      });
    }

    setName("");
    setImage(undefined);
    setCategory("");
    setPrice("");
    setDescription("");
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
          Add new dish
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            setOpen(false);
          }}
          encType="multipart/form-data"
        >
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
                <FormLabel>Description</FormLabel>
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
                  type="file"
                  onChange={onSelectFile}
                />
                {image && (
                  <AspectRatio
                    objectFit="cover"
                    ratio="2.5"
                    sx={{ marginTop: "2px" }}
                  >
                    <img src={preview} alt="Preview" />
                  </AspectRatio>
                )}
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
