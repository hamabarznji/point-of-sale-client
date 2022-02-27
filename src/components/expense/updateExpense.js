import * as React from "react";
import ExpenseService from "../../services/expenseService";
import FormDialog from "../formDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";
import moment from "moment";
export default function UpdateUser({ expense }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Id is required"),
        store_id: yup.number().required("Store id is required"),
        description: yup.string().required("Description is required"),
        amount: yup.string().required("Amount id is required"),
        date: yup.date().required("Date  id is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const updateExpenseHandler = async (data) => {
        try {
            await ExpenseService.updateExpense(data);

            enqueueSnackbar("Expense updated successfully", {
                variant: "success",
            });

            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Expense is not updated! something went wrong.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };

    return (
        <>
            <FormDialog
                title="Update User"
                handleSubmit={handleSubmit(updateExpenseHandler)}
                buttonTitle="Update"
            >
                <InputField
                    name="id"
                    label="Id"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={expense.id}
                    disabled
                />
                <InputField
                    name="store_id"
                    label="Store id"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={expense.store_id}
                    disabled
                />
                <InputField
                    name="description"
                    label="Description"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={expense.description}
                />
                <InputField
                    name="amount"
                    label="Amount"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={expense.amount}
                />
                <InputField
                    name="date"
                    label="Data"
                    control={control}
                    register={register}
                    errors={errors}
                    type="date"
                    defaultValue={moment(expense.date).format("YYYY-MM-DD")}
                />
            </FormDialog>
        </>
    );
}