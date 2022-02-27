import * as React from "react";
import CustomerService from "../../services/customerService";
import FormDialog from "../formDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";

export default function UpdateCustomer({ customer }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Phone number is required"),
        name: yup.string().required("Name is required"),
        address: yup.string().required("Address id is required"),
        store_id: yup.number().required("Supplier id is required"),
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
                />
                <InputField
                    name="name"
                    label="Name"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={customer.name}
                />
                <InputField
                    name="address"
                    label="Address"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={customer.address}
                />
                <InputField
                    name="store_id"
                    label="Store id"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={customer.store_id}
                />
            </FormDialog>
        </>
    );
}
