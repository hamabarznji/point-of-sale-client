import * as React from "react";
import CustomerService from "../../services/CustomerService";
import FormDialog from "../FormDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";

export default function UpdateCustomer({ customer, items }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Phone number is required"),
        name: yup.string().required("Name is required"),
        address: yup.string().required("Address is required"),
        store_id: yup.number().required("Store is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const editCustomerHandler = async (data) => {
        try {
            await CustomerService.updateCustomer(data, data.id);

            enqueueSnackbar("Customer updated successfully", {
                variant: "success",
            });

            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Customer is not updated! something went wrong.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };

    return (
        <>
            <FormDialog
                title="Update Customer"
                handleSubmit={handleSubmit(editCustomerHandler)}
                buttonTitle="Update"
            >
                <InputField
                    name="id"
                    label="Phone Number"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={customer.id}
                    error={errors.hasOwnProperty("id")}
                    helperText={errors.id?.message}
                />
                <InputField
                    name="name"
                    label="Name"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={customer.name}
                    error={errors.hasOwnProperty("name")}
                    helperText={errors.name?.message}
                />
                <InputField
                    name="address"
                    label="Address"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={customer.address}
                    error={errors.hasOwnProperty("address")}
                    helperText={errors.address?.message}
                />
                <InputField
                    name="store_id"
                    label="Store"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={customer.store_id}
                    error={errors.hasOwnProperty("store_id")}
                    helperText={errors.store_id?.message}
                    select
                    items={items}
                />
            </FormDialog>
        </>
    );
}
