import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/joy/CircularProgress";

export default function Loading() {
    return (
        <Backdrop
            open={true}
            sx={{
                color: "transparent",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <CircularProgress size="lg" color="primary" />
        </Backdrop>
    );
}
