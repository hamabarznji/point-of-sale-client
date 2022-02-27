import * as React from "react";
import ExpenseService from "../../services/expenseService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../formDialog";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";

export default function AddEmployee({ getAll }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        store_id: yup.number().required("Store id is required"),
        description: yup.string().required("Description is required"),
        amount: yup.number().required("Amount id is required"),
        date: yup.date().required("Date id is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const addExpenseHandler = async (data) => {
        console.log(data);
        try {
            await ExpenseService.addExpense(data);
            enqueueSnackbar("Expense added successfully.", {
                variant: "success",
            });
            getAll();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add expense! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    return (
        <FormDialog
            buttonTitle="Add Expense"
            title="Add Expense"
            handleSubmit={handleSubmit(addExpenseHandler)}
        >
            <InputField
                control={control}
                errors={errors}
                name="store_id"
                defaultValue=""
                variant="standard"
                label="Store"
                register={register}
            />
            <InputField
                control={control}
                errors={errors}
                name="description"
                defaultValue=""
                variant="standard"
                label="Description"
                register={register}
            />
            <InputField
                control={control}
                errors={errors}
                name="amount"
                defaultValue=""
                variant="standard"
                label="Amount"
                register={register}
            />
            <InputField
                control={control}
                errors={errors}
                name="date"
                defaultValue=""
                variant="standard"
                label="Date"
                register={register}
            />
        </FormDialog>
    );
}
