import * as React from "react";
import Chip from "@mui/material/Chip";
import { Grid, Typography } from "@mui/material";

export default function BasicChips({ expensesLength, totalExpensesAmount }) {
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
                    Number of Expenses:
                    <Chip
                        label={expensesLength ? expensesLength : 0}
                        color="primary"
                    />
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    Total Amount of Expenses:
                    <Chip
                        label={totalExpensesAmount ? totalExpensesAmount : 0}
                        color="secondary"
                    />
                </Typography>
            </Grid>
        </Grid>
    );
}
