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
import { useSnackbar } from "notistack";

// Custom
import { useEffect, useState } from "react";
import ComboDiskList from "./ComboDiskList";
import { useDebounce } from "../../hooks";
import diskApi from "../../api/diskApi";
import status from "../../constants/status";
import { AspectRatio } from "@mui/joy";
import comboApi from "../../api/comboApi";

export default function ComboDialogAdd({
  open,
  setOpen,
  setLoading,
  fetchData,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [openSubModal, setOpenSubModal] = useState(false);
  const [search, setSearch] = useState("");
  const [disks, setDisks] = useState([]);
  const [preview, setPreview] = useState();
  const [selectedDisks, setSelectedDisks] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    const save = async () => {
      setLoading(true);
      try {
        const response = await comboApi.create({
          name,
          description,
          price,
          image,
          disks: selectedDisks,
        });
        if (response?.data?.type === status.success) {
          fetchData();
          enqueueSnackbar(response?.data?.message, {
            variant: "success",
          });
        }
      } catch (err) {
        setLoading(false);
        enqueueSnackbar(err.response?.data?.message, {
          variant: "error",
        });
      }
    };

    save();
  };

  const debouncedValue = useDebounce(search, 500);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await diskApi.search(debouncedValue);
        if (response?.data?.type === status.success) {
          setDisks(() => {
            return response.data.disks.map((item) => {
              item.quantity = 0;
              return item;
            });
          });
        }
      } catch (err) {
        setDisks([]);
      }
    };

    fetchApi();
  }, [debouncedValue]);

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
                  <FormLabel>Description</FormLabel>
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
                    {disks
                      .reduce((sum, cur) => sum + cur.price * cur.quantity, 0)
                      .toLocaleString()}
                    {"đ)"}
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
                      <FormControl>
                        <FormLabel>Search</FormLabel>
                        <Input
                          name="Search"
                          placeholder="Search dishes"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          sx={{ width: "95%" }}
                        />
                      </FormControl>
                      <Stack
                        mt={2}
                        py={2}
                        sx={{
                          maxHeight: "100%",
                          overflow: "auto",
                        }}
                      >
                        <ComboDiskList
                          diskList={disks}
                          setDiskList={setDisks}
                          setSelectedDisks={setSelectedDisks}
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
              </Stack>
            </Stack>

            <Stack
              className="col-2"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <FormControl>
                <FormLabel>Search</FormLabel>
                <Input
                  name="Search"
                  placeholder="Search dishes"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ width: "95%" }}
                />
              </FormControl>
              <Box mt={2} flexBasis={0} flexGrow={1} sx={{ overflow: "auto" }}>
                <ComboDiskList
                  diskList={disks}
                  setDiskList={setDisks}
                  setSelectedDisks={setSelectedDisks}
                />
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
