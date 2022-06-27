import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import UserService from "../../../services/UserService";
import { useSnackbar } from "notistack";
import { posActions } from "../../../store/PosRedux";
import { useDispatch } from "react-redux";
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
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

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
            localStorage.setItem("userId", user.id);
            localStorage.setItem("posToken", user.token);
            localStorage.setItem("userRole", user.role);
            localStorage.setItem("storeId", user.store_id);
            dispatch(posActions.setRole());
            dispatch(posActions.setAuth(user.auth));
            dispatch(posActions.setLogout(false));
            history("/dashboard");
            enqueueSnackbar("Loged in successfully.", {
                variant: "success",
            });

            return Promise.resolve("done");
        } catch (err) {
            history("/");
            enqueueSnackbar("User name or password is incorrect!", {
                variant: "error",
            });
            return Promise.reject(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container item direction="column" spacing={4}>
                    <Grid item>
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
                                        placeholder="username"
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
                                        placeholder="pass"
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
