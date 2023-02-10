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
import TextField from "@mui/joy/TextField";
import { useSnackbar } from "notistack";

// Custom
import { useEffect, useState } from "react";
import { AspectRatio } from "@mui/joy";
import eventApi from "../../api/eventApi";
import status from "../../constants/status";

export default function EventDialogAdd({
    open,
    setOpen,
    fetchData,
    setLoading,
}) {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today = today.toISOString().replace(/:\d{2}.\d{3}Z$/, "");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [eventStatus, setEventStatus] = useState("");
    const [poster, setPoster] = useState("");
    const [preview, setPreview] = useState(undefined);
    const [discount, setDiscount] = useState(0);
    const [minCost, setMinCost] = useState(0);
    const [beginTime, setBeginTime] = useState(today);
    const [endTime, setEndTime] = useState(today);
    const { enqueueSnackbar } = useSnackbar();

    

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!poster) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(poster);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [poster]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setPoster(undefined);
            return;
        }
        // I've kept this example simple by using the first poster instead of multiple
        setPoster(e.target.files[0]);
    };

    const handleSubmit = () => {
        const submit = async () => {
            setLoading(true);
            try {
                const data = {
                    name,
                    description,
                    status: eventStatus,
                    discount,
                    minCost,
                    beginTime,
                    endTime,
                    image: poster,
                };
                const response = await eventApi.create(data);
                if (response?.data?.type === status.success) {
                    fetchData();
                    enqueueSnackbar(response.data?.message, {
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

        submit();
        setName("");
        setDescription("");
        setEventStatus("");
        setDiscount("");
        setMinCost("");
        setBeginTime(today);
        setEndTime(today);
        setPoster("");
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
                    Add new event
                </Typography>
                <Stack
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        setOpen(false);
                    }}
                >
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
                                placeholder="This is an event featuring..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Input
                                name="status"
                                placeholder="Status"
                                value={eventStatus}
                                onChange={(e) => setEventStatus(e.target.value)}
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Discount</FormLabel>
                            <Input
                                type="number"
                                name="discount"
                                placeholder="50000"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Min price</FormLabel>
                            <Input
                                type="number"
                                name="Min price"
                                placeholder="50000"
                                value={minCost}
                                onChange={(e) => setMinCost(e.target.value)}
                            />
                        </FormControl>
                        <TextField
                            required
                            label="Begin Time"
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
                            <FormLabel>Poster</FormLabel>
                            <Input
                                name="poster"
                                placeholder="poster"
                                type="file"
                                onChange={onSelectFile}
                            />
                            {poster && (
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
