import * as React from "react";
import UserService from "../../services/UserService";
import FormDialog from "../FormDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";

export default function UpdateUser({ user, getAll }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Phone number is required"),
        username: yup.string().required("Name is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const deleteUserHandler = async (data) => {
        try {
            await UserService.deleteUser(data.id);

            enqueueSnackbar("User deleted successfully", {
                variant: "success",
            });
            getAll();

            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("User is not deleted! something went wrong.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };

    return (
        <>
            <FormDialog
                title="Are you sure of deleting this user?"
                handleSubmit={handleSubmit(deleteUserHandler)}
                buttonTitle="Delete"
                color="error"
            >
                <InputField
                    name="id"
                    label="Id"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={user.id}
                    disabled
                />
                <InputField
                    name="username"
                    label="Name"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={user.username}
                    error={errors.hasOwnProperty("username")}
                    helperText={errors.username?.message}
                    disabled
                />
            </FormDialog>
        </>
    );
}
