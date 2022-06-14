import React from "react";
/* import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; */
import * as yup from "yup";
import { Button, Grid, TextField } from "@mui/material";
/* import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack"; */

/* const useStyles = makeStyles({
    textField: {
        width: "30rem",
    },
    button: {
        width: "30rem",
        background: "#7367F0",
    },
});
 */
export default function Form(props) {
    return (
        <>
            <form onSubmit={props.onSubmit}>
                <Grid
                    container
                    item
                    direction="column"
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                    lg={12}
                >
                    {props.children}
                </Grid>
                <Grid item>
                    <Button type="submit">Add</Button>
                </Grid>
            </form>
        </>
    );
}
