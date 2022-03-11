import * as React from "react";
import CustomerService from "../../services/CustomerService";
import FormDialog from "../FormDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";

export default function UpdateCustomer({ customer }) {
    const { enqueueSnackbar } = useSnackbar();
    const [temptId, setTempId] = React.useState(customer.id);
    const schema = yup.object().shape({
        id: yup.number().required("Phone number is required"),
        name: yup.string().required("Name is required"),
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
    const editCustomerHandler = async (data) => {
        try {
            await CustomerService.updateCustomer({
                id: temptId,
                newId: data.id,
                name: data.name,
                address: data.address,
                store_id: localStorage.getItem("storeId"),
            });

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
            </FormDialog>
        </>
    );
}
