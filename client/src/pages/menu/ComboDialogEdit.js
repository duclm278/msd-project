import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";

// Icons
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

// Custom
import { AspectRatio } from "@mui/joy";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ComboDiskList from "./ComboDiskList";
import ComboDiskListSelected from "./ComboDiskListSelected";
// import { useDebounce } from "../../hooks";
import comboApi from "../../api/comboApi";
// import diskApi from "../../api/diskApi";
import status from "../../constants/status";

export default function DiskDialogEdit(props) {
  const { id, open, setOpen, setLoading, fetchData } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(props.image);
  const [imageChanged, setImageChanged] = useState(false);
  const [diskList, setDiskList] = useState([]);
  const [originalDisks, setOriginalDisks] = useState([]);
  const [selectedDisks, setSelectedDisks] = useState([]);
  const [openDiskListSubModal, setOpenDiskListSubModal] = useState(false);
  const [openSelectedSubModal, setOpenSelectedSubModal] = useState(false);
  // const [search, setSearch] = useState("");
  const [preview, setPreview] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await comboApi.getComboById(id);
        if (response?.data?.type === status.success) {
          const combo = response?.data?.combo;
          setName(combo.combo_name);
          setDescription(combo.description);
          setPrice(combo.combo_price);
          setDiskList(combo.disks);
          setSelectedDisks(combo.disks);
          setOriginalDisks(combo.disks);
        }
      } catch (err) {
        enqueueSnackbar(err.response.data?.message, {
          variant: "error",
        });
        setOpen(false);
      }
    };

    fetchApi();
  }, [id, enqueueSnackbar, setOpen]);

  // const debouncedValue = useDebounce(search, 500);
  // useEffect(() => {
  //     const fetchApi = async () => {
  //         try {
  //             const response = await diskApi.search(debouncedValue);
  //             if (response?.data?.type === status.success) {
  //                 setDiskList(() => {
  //                     return response.data.disks.map((item) => {
  //                         item.quantity = 0;
  //                         return item;
  //                     });
  //                 });
  //             }
  //         } catch (err) {
  //             setDiskList([]);
  //         }
  //     };
  //     fetchApi();
  // }, [debouncedValue]);

  useEffect(() => {
    setSelectedDisks(() =>
      diskList
        .filter((item) => item.quantity !== 0)
        .map((item) => ({
          id: item.disk_id,
          price: item.price,
          quantity: item.quantity,
        }))
    );
  }, [diskList]);

  useEffect(() => {
    setPreview(image);
    // eslint-disable-next-line
  }, []);

  const onSelectFile = (e) => {
    setImageChanged(true);
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setImage(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(objectUrl);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const save = async () => {
      const data = imageChanged
        ? {
            name,
            description,
            price,
            image,
            disks: selectedDisks,
          }
        : {
            name,
            description,
            price,
            disks: selectedDisks,
          };
      setLoading(true);
      try {
        const response = await comboApi.update(id, data);
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
    handleClose();
  };

  const handleClose = () => {
    setName(props.name);
    setDescription(props.description);
    setPrice(props.price);
    setPreview(props.image);
    setDiskList(() => [...originalDisks]);
    setSelectedDisks(() => [...originalDisks]);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog
        sx={{
          maxWidth: "100vw",
          maxHeight: "95vh",
          overflowY: "auto",
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
          <Stack direction="row" spacing={3}>
            <Stack className="col-1" width={250} flex={1}>
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
                    {selectedDisks
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
                    onClick={() => setOpenDiskListSubModal(true)}
                  >
                    Select disks
                  </Button>
                </FormControl>
                <FormControl sx={{ display: { xs: "flex", md: "none" } }}>
                  <FormLabel>Selected</FormLabel>
                  <Button
                    variant="outlined"
                    onClick={() => setOpenSelectedSubModal(true)}
                  >
                    View selected
                  </Button>
                </FormControl>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <IconButton component="label">
                    <AddPhotoAlternateRoundedIcon />
                    <input type="file" hidden onChange={onSelectFile} />
                  </IconButton>
                  {image && (
                    <AspectRatio
                      ratio="4 / 3"
                      maxHeight={175}
                      objectFit="cover"
                      sx={{ marginTop: 1 }}
                    >
                      <img src={preview} alt="Preview" />
                    </AspectRatio>
                  )}
                </FormControl>
              </Stack>
            </Stack>

            <Stack
              className="col-2"
              sx={{ display: { xs: "none", md: "flex" } }}
              ml={2}
              width={250}
              flex={1}
            >
              <ComboViewSelected
                diskList={selectedDisks}
                setDiskList={setSelectedDisks}
              />
            </Stack>

            <Stack
              className="col-3"
              sx={{ display: { xs: "none", sm: "flex" } }}
              width={250}
              flex={1}
            >
              <Box flexBasis={0} flexGrow={1} sx={{ overflow: "auto" }}>
                <Typography component="h2" fontSize="1.25em">
                  Add disks
                </Typography>
                <ComboDiskList
                  diskList={diskList}
                  selectedDisks={selectedDisks}
                  setSelectedDisks={setSelectedDisks}
                />
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
              onClick={() => setOpen(false)}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Stack>

        <Modal
          open={openDiskListSubModal}
          onClose={() => setOpenDiskListSubModal(false)}
        >
          <ModalDialog layout="fullscreen">
            <ModalClose />
            <Typography component="h2" fontSize="1.25em" mb={2}>
              Select disks
            </Typography>
            <ComboDiskList
              diskList={diskList}
              selectedDisks={selectedDisks}
              setSelectedDisks={setSelectedDisks}
            />
          </ModalDialog>
        </Modal>

        <Modal
          open={openSelectedSubModal}
          onClose={() => setOpenSelectedSubModal(false)}
        >
          <ModalDialog layout="fullscreen">
            <ModalClose />
            <Typography component="h2" fontSize="1.25em" mb={2}>
              View selected
            </Typography>
            <ComboViewSelected
              diskList={selectedDisks}
              setDiskList={setSelectedDisks}
            />
          </ModalDialog>
        </Modal>
      </ModalDialog>
    </Modal>
  );
}

function ComboViewSelected({ diskList, setDiskList }) {
  return (
    <Stack
      flexBasis={0}
      flexGrow={1}
      sx={{
        pb: 2,
        maxHeight: { xs: "100%" },
        overflowY: "auto",
      }}
    >
      <ComboDiskListSelected diskList={diskList} setDiskList={setDiskList} />
    </Stack>
  );
}
