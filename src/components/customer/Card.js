import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chip from "./Chip";
export default function OutlinedCard({ labelName, labelValue }) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Card
                style={{
                    background: "#F8F8F8",
                    width: 400,
                    height: 100,
                }}
            >
                <CardContent>
                    <Chip labelValue={labelValue} />
                </CardContent>
            </Card>
        </>
    );
}
