import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

export default function ColorChips({ chips }) {
    return (
        <Stack
            spacing={1}
            alignItems="center"
            direction="column"
            style={{ marginLeft: "25rem" }}
        >
            <Stack direction="row" spacing={1}>
                {chips.map((chip, index) => {
                    return (
                        <>
                            <Typography variant="h5" key={index}>
                                {chip?.chipContent} :
                            </Typography>
                            <Chip
                                label={chip.label}
                                color={"secondary"}
                                key={index}
                            />
                        </>
                    );
                })}
            </Stack>
        </Stack>
    );
}
