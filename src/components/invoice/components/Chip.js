import * as React from "react";
import Chip from "@mui/material/Chip";
import { Grid, Typography } from "@mui/material";

export default function BasicChips({ ordersLength, totalSales }) {
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
                    Number of Invoices:
                    <Chip
                        label={ordersLength ? ordersLength : 0}
                        color="primary"
                    />
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    Total Amount of Sales:
                    <Chip
                        label={totalSales ? totalSales : 0}
                        color="secondary"
                    />
                </Typography>
            </Grid>
        </Grid>
    );
}
