import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Grid, Typography } from "@mui/material";

export default function BasicChips({ name, debt, address, phone, orders }) {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            spacing={3}
            xs={12}
        >
            <Grid item>
                <Typography variant="h6">
                    {" "}
                    Name: <Chip label={name} color="primary" />
                </Typography>
            </Grid>{" "}
            <Grid item>
                <Typography variant="h6">
                    Phone: <Chip label={phone} color="secondary" />{" "}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    Address: <Chip label={address} color="success" />
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    Orders: <Chip label={orders} color="warning" />
                </Typography>
            </Grid>{" "}
            <Grid item>
                <Typography variant="h6">
                    Total Debt: <Chip label={debt} color="error" />
                </Typography>
            </Grid>
        </Grid>
    );
}
