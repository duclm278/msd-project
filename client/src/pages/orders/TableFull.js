import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

// Custom
import * as React from "react";
import TableFullRow from "./TableFullRow";

export default function TableFull({ rows, cols }) {
    return (
        <Sheet
            variant="outlined"
            sx={{
                overflow: "auto",
                borderRadius: "sm",
                display: "grid",
                gridColumn: "1/-1",
                gridTemplateColumns:
                    // "minmax(75px, 1fr) minmax(50px, 1fr) minmax(50px, 1fr) minmax(25px, 1fr) minmax(50px, 1fr) minmax(50px, 1fr) 45px",
                    "20% 25% 15% 10% 10% 10% 10%",
                "& > *": {
                    p: 2,
                    [`&:nth-of-type(n):not(:nth-last-child(-n+${cols.length}))`]:
                        {
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        },
                },
            }}
        >
            {cols.map((col, i) => (
                <React.Fragment key={i}>
                    <Typography level="body3" fontWeight="md">
                        {col.headerName}
                    </Typography>
                </React.Fragment>
            ))}

            {rows.map((row, i) => (
                <React.Fragment key={i}>
                    <TableFullRow no={i} data={row} />
                </React.Fragment>
            ))}
        </Sheet>
    );
}
