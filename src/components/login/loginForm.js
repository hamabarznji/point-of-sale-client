import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import UserService from "../../services/userService";

const useStyles = makeStyles({
    textField: {
        width: "30rem",
    },
    button: {
        width: "30rem",
        background: "#7367F0",
    },
});

export default function LoginForm() {
    const history = useNavigate();
    const classes = useStyles();

    const schema = yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const user = await UserService.login(data);
            localStorage.setItem("posToken", user.token);
            history("/dashboard");
            return Promise.resolve("done");
        } catch (err) {
            console.log(err);
            history("/");
            return Promise.reject(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container item direction="column" spacing={4}>
                    <Grid item textAlign="center">
                        <h2>Welcome to Chalishkan Company</h2>
                    </Grid>
                    <Grid item>
                        <Controller
                            control={control}
                            errors={errors}
                            name="username"
                            defaultValue="hama"
                            render={(field) => {
                                return (
                                    <TextField
                                        className={classes.textField}
                                        {...register("username")}
                                        {...field}
                                        name="username"
                                        label="User Name"
                                        error={errors.hasOwnProperty(
                                            "username"
                                        )}
                                        helperText={errors.username?.message}
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            control={control}
                            errors={errors}
                            name="password"
                            defaultValue="12345"
                            render={(field) => {
                                return (
                                    <TextField
                                        className={classes.textField}
                                        {...register("password")}
                                        {...field}
                                        name="password"
                                        label="Password"
                                        error={errors.hasOwnProperty(
                                            "password"
                                        )}
                                        helperText={errors.password?.message}
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.button}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
