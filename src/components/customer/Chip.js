import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

export default function BasicChips({ labelName, labelValue }) {
    return (
        <Stack direction="row" spacing={2}>
            <Typography>
                {labelName}
                <b>
                    <Chip
                        label={labelValue}
                        variant="outlined"
                        color="primary"
                    />
                </b>
            </Typography>
        </Stack>
    );
}
