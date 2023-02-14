import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import CircularProgress from "@mui/joy/CircularProgress";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";

export function SelectEvent({ event, setEvent, events, loading }) {
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
      getOptionLabel={(option) => option?.name || ""}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={loading}
      endDecorator={
        loading ? (
          <CircularProgress size="sm" sx={{ bgcolor: "background.surface" }} />
        ) : null
      }
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
