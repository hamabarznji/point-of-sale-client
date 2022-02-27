import * as React from "react";
import EmployeeService from "../../services/employeeService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../formDialog";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";

export default function AddEmployee({ getAll }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
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
            />
            <InputField
                control={control}
                errors={errors}
                name="salary"
                defaultValue=""
                variant="standard"
                label="Salary"
                register={register}
            />
            <InputField
                control={control}
                errors={errors}
                name="address"
                defaultValue=""
                variant="standard"
                label="Address"
                register={register}
            />
            <InputField
                control={control}
                errors={errors}
                name="phone"
                defaultValue=""
                variant="standard"
                label="Phone Number"
                register={register}
            />
            <InputField
                control={control}
                errors={errors}
                name="store_id"
                defaultValue=""
                variant="standard"
                label="Store Id"
                register={register}
            />
        </FormDialog>
    );
}