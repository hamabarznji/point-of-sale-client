import * as React from "react";
import StoreService from "../../services/StoreService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../FormDialog";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";

export default function UpdateStore({ getAll, store }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Id is required"),
        name: yup.string().required("Name is required"),
        location: yup.string().required("Location id is required"),
        phone: yup.number().required("Phone id is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    React.useEffect(() => {
        if (errors.location) {
            enqueueSnackbar(errors.location.message, {
                variant: "error",
            });
        }
    }, [errors, enqueueSnackbar]);

    const UpdateStoreHandler = async (data) => {
        try {
            await StoreService.updateStore(data);
            console.log(data);
            enqueueSnackbar("Store updated successfully.", {
                variant: "success",
            });
            getAll();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not update store! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };

    return (
        <FormDialog
            buttonTitle="Update"
            title="Update Store"
            handleSubmit={handleSubmit(UpdateStoreHandler)}
        >
            <InputField
                control={control}
                errors={errors}
                name="id"
                defaultValue={store.id}
                variant="standard"
                label="Name"
                register={register}
                error={errors.hasOwnProperty("id")}
                helperText={errors.id?.message}
                disabled
            />
            <InputField
                control={control}
                errors={errors}
                name="name"
                defaultValue={store.name}
                variant="standard"
                label="Name"
                register={register}
                error={errors.hasOwnProperty("name")}
                helperText={errors.name?.message}
            />

            <InputField
                control={control}
                errors={errors}
                name="location"
                defaultValue={store.location}
                variant="standard"
                label="Location"
                register={register}
                error={errors.hasOwnProperty("location")}
                helperText={errors.location?.message}
            />
            <InputField
                control={control}
                errors={errors}
                name="phone"
                defaultValue={store.phone}
                variant="standard"
                label="Phone"
                register={register}
                error={errors.hasOwnProperty("phone")}
                helperText={errors.phone?.message}
            />
        </FormDialog>
    );
}
