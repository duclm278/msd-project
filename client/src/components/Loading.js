import CircularProgress from "@mui/joy/CircularProgress";

export default function Loading() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <CircularProgress size="lg" color="primary" />
        </div>
    );
}
