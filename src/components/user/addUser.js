import * as React from "react";
import UserService from "../../services/userService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../formDialog";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";

export default function AddEmployee({ getAll }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        username: yup.string().required("Name is required"),
        password: yup.string().required("Password is required"),
        role: yup.string().required("Role is required"),
        store_id: yup.number().required("Store id is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const addUserHandler = async (data) => {
        try {
            await UserService.addUser(data);
            enqueueSnackbar("User added successfully.", {
                variant: "success",
            });
            getAll();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add user! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    return (
        <FormDialog
            buttonTitle="Add User"
            title="Add User"
            handleSubmit={handleSubmit(addUserHandler)}
        >
            <InputField
                control={control}
                errors={errors}
                name="username"
                defaultValue=""
                variant="standard"
                label="Name"
                register={register}
            />{" "}
            <InputField
                control={control}
                errors={errors}
                name="password"
                defaultValue=""
                variant="standard"
                label="Password"
                register={register}
            />
            <InputField
                control={control}
                errors={errors}
                name="role"
                defaultValue=""
                variant="standard"
                label="Role"
                register={register}
            />
            <InputField
                control={control}
                errors={errors}
                name="store_id"
                defaultValue=""
                variant="standard"
                label="Store Id"
                register={register}
            />
        </FormDialog>
    );
}
