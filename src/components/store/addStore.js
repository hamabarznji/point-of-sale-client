import * as React from "react";
import StoreService from "../../services/storeService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../formDialog";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";

export default function AddStore({ getAll }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
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

    const addStoreHandler = async (data) => {
        try {
            await StoreService.addStore(data);
            enqueueSnackbar("Store added successfully.", {
                variant: "success",
            });
            getAll();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add store! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };

    return (
        <FormDialog
            buttonTitle="Add Store"
            title="Add Store"
            handleSubmit={handleSubmit(addStoreHandler)}
        >
            <InputField
                control={control}
                errors={errors}
                name="name"
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
                variant="standard"
                label="Phone"
                register={register}
                error={errors.hasOwnProperty("phone")}
                helperText={errors.phone?.message}
            />
        </FormDialog>
    );
}
