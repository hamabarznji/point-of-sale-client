import * as React from "react";
import SupplierService from "../../services/SupplierService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../FormDialog";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";
export default function AddCategory({ getAll }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        phone: yup.string().required("Phone is required"),
        address: yup.string().required("Address is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const addSupplierHandler = async (data) => {
        try {
            await SupplierService.addSupplier({
                name: data.name,
                phone: data.phone,
                address: data.address,
            });
            enqueueSnackbar("Supplier added successfully.", {
                variant: "success",
            });
            getAll();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add supplier! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    return (
        <FormDialog
            buttonTitle="Add Supplier"
            title="Add Supplier"
            handleSubmit={handleSubmit(addSupplierHandler)}
            variant="contained"
        >
            <InputField
                control={control}
                errors={errors}
                name="name"
                defaultValue=""
                variant="standard"
                label="Supplier Name"
                register={register}
                error={errors.hasOwnProperty("name")}
                helperText={errors.id?.message}
            />{" "}
            <InputField
                control={control}
                errors={errors}
                name="phone"
                defaultValue=""
                variant="standard"
                label="Phone"
                register={register}
                error={errors.hasOwnProperty("phone")}
                helperText={errors.id?.message}
            />{" "}
            <InputField
                control={control}
                errors={errors}
                name="address"
                defaultValue=""
                variant="standard"
                label="Address"
                register={register}
                error={errors.hasOwnProperty("address")}
                helperText={errors.id?.message}
            />
        </FormDialog>
    );
}
