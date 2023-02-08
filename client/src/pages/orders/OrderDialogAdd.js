import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import ListItemContent from "@mui/joy/ListItemContent";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";

// Custom
import { useState } from "react";
import OrderDiskList from "./OrderDiskList";

// TODO: Fetch data from API
const events = [
  {
    name: "Magical July",
    description: "A magical journey to the land of the unknown...",
    status: "Due",
    discount: 50000,
    beginTime: "2022-07-01T00:00",
    endTime: "2022-07-31T00:00",
    poster:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?fm=jpg",
  },
  {
    name: "Hello September",
    description: "A magical journey to the land of the unknown...",
    status: "Due",
    discount: 75000,
    beginTime: "2022-09-01T00:00",
    endTime: "2022-09-30T00:00",
    poster:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?fm=jpg",
  },
  {
    name: "NN November",
    description: "A magical journey to the land of the unknown...",
    status: "Due",
    discount: 10000,
    beginTime: "2022-11-01T00:00",
    endTime: "2022-11-30T00:00",
    poster:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?fm=jpg",
  },
];

// TODO: Fetch data from API
const dishes = Array.from({ length: 15 }, () => ({
  name: "Fried Rice",
  price: 150000,
  image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?fm=jpg",
  category: "Main Menu",
  quantity: 0,
}));

export default function OrderDialogAdd({ open, setOpen }) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString().replace(/:\d{2}.\d{3}Z$/, "");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [table, setTable] = useState("");
  const [event, setEvent] = useState(null);
  const [reservedTime, setReservedTime] = useState(today);
  const [diskList, setDiskList] = useState(dishes);
  const [openSubModal, setOpenSubModal] = useState(false);
  const beforeCost = diskList.reduce((s, i) => s + i.price * i.quantity, 0);
  const afterCost = beforeCost - (event?.discount || 0);

  const handleSubmit = () => {
    // TODO: Handle response
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        sx={{
          maxHeight: "95vh",
          overflowY: "auto",
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
          Add new order
        </Typography>
        <Stack
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            setOpen(false);
          }}
        >
          <Stack direction="row" spacing={3}>
            <Stack className="col-1" flexGrow={1}>
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
                  <FormLabel>Phone</FormLabel>
                  <Input
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Table</FormLabel>
                  <Input
                    name="table"
                    placeholder="Table"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                  />
                </FormControl>
                <TextField
                  required
                  label="Reserved At"
                  type="datetime-local"
                  value={reservedTime}
                  onChange={(e) => setReservedTime(e.target.value)}
                />
                <FormControl>
                  <FormLabel>
                    Event{" "}
                    {`(Discount: ${(event?.discount || 0).toLocaleString()})`}
                  </FormLabel>
                  <EventSelect
                    event={event}
                    setEvent={setEvent}
                    events={events}
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
                        <OrderDiskList
                          diskList={diskList}
                          setDiskList={setDiskList}
                        />
                      </Stack>
                    </ModalDialog>
                  </Modal>
                </FormControl>

                <Typography level="h3" fontSize="1.1em" mt={1}>
                  {"Total: "}
                  {beforeCost === afterCost
                    ? `${beforeCost.toLocaleString()}`
                    : `${beforeCost.toLocaleString()} → ${afterCost.toLocaleString()}`}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              className="col-2"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Box flexBasis={0} flexGrow={1} sx={{ overflow: "auto" }}>
                <OrderDiskList diskList={diskList} setDiskList={setDiskList} />
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

export function EventSelect({ event, setEvent, events }) {
  return (
    <Autocomplete
      placeholder="Apply event to discount"
      value={event}
      onChange={(e, newValue) => {
        setEvent(newValue);
      }}
      slotProps={{
        input: {
          autoComplete: "new-password", // disable autocomplete and autofill
        },
      }}
      options={events}
      autoHighlight
      getOptionLabel={(option) => option.name || ""}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          <ListItemContent sx={{ fontSize: "sm" }}>
            {option.name}
            <Typography level="body3">
              {"Time: "}
              {new Date(option.beginTime).toLocaleDateString()}
              {" - "}
              {new Date(option.endTime).toLocaleDateString()}
            </Typography>
            <Typography level="body3">
              Discount: {option.discount.toLocaleString()}
            </Typography>
          </ListItemContent>
        </AutocompleteOption>
      )}
    />
  );
}
