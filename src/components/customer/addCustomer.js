import * as React from "react";
import CustomerService from "../../services/CustomerService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../FormDialog";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";

export default function AddCustomer({ getAll, items }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Phone number is required"),
        name: yup.string().required("Name is required"),
        address: yup.string().required("Address is required"),
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

    const addCustomerHandler = async (data) => {
        try {
            await CustomerService.addCustomer(data);
            enqueueSnackbar("Customer added successfully.", {
                variant: "success",
            });
            getAll();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add customer! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    return (
        <FormDialog
            buttonTitle="Add Customer"
            title="Add Customer"
            handleSubmit={handleSubmit(addCustomerHandler)}
        >
            <InputField
                control={control}
                errors={errors}
                name="id"
                defaultValue=""
                variant="standard"
                label="Phone Number"
                register={register}
                error={errors.hasOwnProperty("id")}
                helperText={errors.id?.message}
            />
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
                name="address"
                defaultValue=""
                variant="standard"
                label="Address"
                register={register}
                error={errors.hasOwnProperty("address")}
                helperText={errors.address?.message}
            />

            <InputField
                control={control}
                errors={errors}
                name="store_id"
                defaultValue=""
                variant="standard"
                label="Store"
                register={register}
                error={errors.hasOwnProperty("store_id")}
                helperText={errors.store_id?.message}
                select
                items={items}
            />
        </FormDialog>
    );
}
