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
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";
import { useSnackbar } from "notistack";

// Icons
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

// Custom
import { useState } from "react";
import eventApi from "../../api/eventApi";
import status from "../../constants/status";

export default function EventDialogEdit(props) {
    const { id, open, setOpen, setLoading, fetchData } = props;
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [poster, setPoster] = useState(props.poster);
    const [discount, setDiscount] = useState(props.discount);
    const [beginTime, setBeginTime] = useState(props.beginTime);
    const [endTime, setEndTime] = useState(props.endTime);
    const { enqueueSnackbar } = useSnackbar();

    const handleSave = (e) => {
        e.preventDefault();
        setOpen(() => false);
    };

    const handleDelete = (e) => {
        const remove = async () => {
            setLoading(true);
            try {
                const response = await eventApi.delete(id);
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
        
        remove();
        setOpen(() => false);
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
                    Edit event
                </Typography>
                <Stack component="form">
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
