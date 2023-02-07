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
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

// Custom
import { useState } from "react";
import { filterOpts } from ".";
import tableApi from "../../api/tableApi";
import status from "../../constants/status";

export default function TableDialogEdit(props) {
    const { open, setOpen, setLoading, fetchData } = props;
    const [id, setId] = useState(props.id);
    const [numberOfSeats, setNumberOfSeats] = useState(props.numberOfSeats);
    const [tableStatus, setTableStatus] = useState(props.tableStatus);

    const handleSave = (e) => {
        e.preventDefault();
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await tableApi.updateTable(id, {
                    numberOfSeats,
                    tableStatus,
                });

                if (response?.data?.type === status.success) {
                    setLoading(false);
                    fetchData();
                    alert(response?.data?.message);
                }
            } catch (err) {
                setLoading(false);
                alert(err.response.data.message);
            }
            setOpen(false);
        };

        fetch();
    };

    return (
        <>
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
                        Edit table
                    </Typography>
                    <form>
                        <Stack>
                            <Stack spacing={2}>
                                <FormControl required>
                                    <FormLabel>ID</FormLabel>
                                    <Input
                                        name="name"
                                        placeholder="Name"
                                        autoFocus
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Capacity</FormLabel>
                                    <Input
                                        name="capacity"
                                        placeholder="Number of seats"
                                        value={numberOfSeats}
                                        onChange={(e) =>
                                            setNumberOfSeats(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        value={tableStatus}
                                        onChange={(e, newTableStatus) => {
                                            setTableStatus(newTableStatus);
                                        }}
                                    >
                                        {filterOpts.map((filterOpt) => (
                                            <Option
                                                key={filterOpt}
                                                value={filterOpt.status}
                                            >
                                                {filterOpt.status}
                                            </Option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Box
                                mt={3}
                                display="flex"
                                gap={2}
                                sx={{ width: "100%" }}
                            >
                                <Button
                                    type="button"
                                    onClick={(e) => handleSave(e)}
                                    startDecorator={<SaveRoundedIcon />}
                                    sx={{ flex: 1 }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    );
}
