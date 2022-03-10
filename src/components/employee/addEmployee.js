import * as React from "react";
import EmployeeService from "../../services/EmployeeService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../FormDialog";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";

export default function AddEmployee({ getAll, items }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        address: yup.string().required("Address is required"),
        store_id: yup.number().required("Store is required"),
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

    const addEmployeeHandler = async (data) => {
        try {
            await EmployeeService.addEmployee(data);
            enqueueSnackbar("Employee added successfully.", {
                variant: "success",
            });
            getAll();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add employee! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    return (
        <FormDialog
            buttonTitle="Add Employee"
            title="Add Employee"
            handleSubmit={handleSubmit(addEmployeeHandler)}
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
                name="salary"
                defaultValue=""
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
                name="phone"
                defaultValue=""
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
