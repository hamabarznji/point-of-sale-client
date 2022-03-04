import * as React from "react";
import EmployeeService from "../../services/employeeService";
import FormDialog from "../formDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";

export default function UpdateCustomer({ employee, items, getAll }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Id is required"),
        name: yup.string().required("Name is required"),
        address: yup.string().required("Address is required"),
        store_id: yup.number().required("Store id is required"),
        salary: yup.number().required("Salary id is required"),
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
    const updateCustomerHandler = async (data) => {
        console.log(data);
        try {
            await EmployeeService.updateEmployee(data);

            enqueueSnackbar("Employee updated successfully", {
                variant: "success",
            });
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Employee is not updated! something went wrong.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };

    return (
        <>
            <FormDialog
                buttonTitle="Update"
                title="Update Employee"
                handleSubmit={handleSubmit(updateCustomerHandler)}
            >
                <InputField
                    control={control}
                    errors={errors}
                    name="id"
                    variant="standard"
                    label="Id"
                    register={register}
                    defaultValue={employee.id}
                    disabled
                />
                <InputField
                    control={control}
                    errors={errors}
                    name="name"
                    variant="standard"
                    label="Name"
                    register={register}
                    defaultValue={employee.name}
                    error={errors.hasOwnProperty("name")}
                    helperText={errors.name?.message}
                />
                <InputField
                    control={control}
                    errors={errors}
                    name="salary"
                    defaultValue={employee.salary}
                    variant="standard"
                    label="Salary"
                    register={register}
                    error={errors.hasOwnProperty("salary")}
                    helperText={errors.salary?.message}
                />
                <InputField
                    control={control}
                    errors={errors}
                    name="address"
                    defaultValue={employee.address}
                    variant="standard"
                    label="Address"
                    register={register}
                    error={errors.hasOwnProperty("address")}
                    helperText={errors.address?.message}
                />
                <InputField
                    control={control}
                    errors={errors}
                    name="phone"
                    defaultValue={employee.phone}
                    variant="standard"
                    label="Phone Number"
                    register={register}
                    error={errors.hasOwnProperty("phone")}
                    helperText={errors.phone?.message}
                />
                <InputField
                    control={control}
                    errors={errors}
                    name="store_id"
                    defaultValue={employee.store_id}
                    variant="standard"
                    label="Store"
                    register={register}
                    error={errors.hasOwnProperty("store_id")}
                    helperText={errors.store_id?.message}
                    select
                    items={items}
                />
            </FormDialog>
        </>
    );
}
