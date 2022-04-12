import Chip from "@mui/material/Chip";
import { Grid } from "@material-ui/core";
import { Typography } from "@mui/material";

export default function Sale() {
    return (
        <>
            <Grid container direction="row" xs={12} spacing={10}>
                <Grid
                    item
                    container
                    xs={12}
                    spacing={10}
                    justifyContent="center"
                    alignItems="center"
                >
                    {" "}
                    <Grid item>
                        <Typography variant="h5">Total Products</Typography>
                    </Grid>
                    <Grid item>
                        <Chip label="5000kg" color={"primary"} />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    spacing={10}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h5">Total Weight</Typography>
                    </Grid>
                    <Grid item>
                        <Chip label="5000kg" color={"info"} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">Total Quantity</Typography>
                    </Grid>
                    <Grid item>
                        <Chip label="10000" color={"info"} />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    spacing={10}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h5">Profit </Typography>
                    </Grid>
                    <Grid item>
                        <Chip label="5000kg" color={"success"} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">Loss </Typography>
                    </Grid>
                    <Grid item>
                        <Chip label="10000" color={"error"} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
