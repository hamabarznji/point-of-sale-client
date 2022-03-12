import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({
    buttonTitle,
    children,
    title,
    handleSubmit,
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ marginLeft: "5rem" }}>
            <Button variant="outlined" onClick={handleClickOpen}>
                {buttonTitle}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>{children}</DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                handleClose();
                                handleSubmit();
                            }}
                            stype="submit"
                        >
                            {buttonTitle}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
