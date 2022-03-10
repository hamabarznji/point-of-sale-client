import * as React from "react";
import UserService from "../../services/UserService";
import FormDialog from "../FormDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";

export default function UpdateUser({ user }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Phone number is required"),
        username: yup.string().required("Name is required"),
        role: yup.string().required("Role id is required"),
        store_id: yup.number().required("Store  id is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const updateUserHandler = async (data) => {
        try {
            await UserService.updateUser(data);

            enqueueSnackbar("User updated successfully", {
                variant: "success",
            });

            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("User is not updated! something went wrong.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };

    return (
        <>
            <FormDialog
                title="Update User"
                handleSubmit={handleSubmit(updateUserHandler)}
                buttonTitle="Update"
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
                />
                <InputField
                    name="role"
                    label="Role"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={user.role}
                    error={errors.hasOwnProperty("role")}
                    helperText={errors.role?.message}
                />
                <InputField
                    name="store_id"
                    label="Store id"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={user.store_id}
                    error={errors.hasOwnProperty("store_id")}
                    helperText={errors.store_id?.message}
                />
            </FormDialog>
        </>
    );
}
