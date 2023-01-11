import IconButton from "@mui/joy/IconButton";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";

// Icons
import CloseRounded from "@mui/icons-material/CloseRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

// Custom
import { useRef, useState } from "react";

export default function SelectFilter({ filterOpts }) {
  const filterRef = useRef(null);
  const [filterOpt, setFilterOpt] = useState(null);
  return (
    <Select
      action={filterRef}
      value={filterOpt}
      placeholder="Filters"
      onChange={(e, newValue) => setFilterOpt(newValue)}
      startDecorator={<FilterListRoundedIcon />}
      {...(filterOpt && {
        endDecorator: (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onClick={() => {
              setFilterOpt(null);
              filterRef.current?.focusVisible();
            }}
          >
            <CloseRounded />
          </IconButton>
        ),
        indicator: null,
      })}
    >
      <Option value="0">{filterOpts[0]}</Option>
      <Option value="1">{filterOpts[1]}</Option>
      <Option value="2">{filterOpts[2]}</Option>
      <Option value="3">{filterOpts[3]}</Option>
    </Select>
  );
}
