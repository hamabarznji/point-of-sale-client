import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../FormDialog";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";
import PaymentService from "../../services/PaymentService";
import moment from "moment";
export default function AddCustomer({ getAll, id, dueAmount }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        amount: yup.number().required("Amount is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const addPaymentHandler = async (data) => {
        if (data.amount > dueAmount) {
            enqueueSnackbar(
                "Payment amount cannot be greater than due amount",
                {
                    variant: "error",
                }
            );
            return;
        }
        const date = moment().format("YYYY-MM-DD");
        try {
            await PaymentService.addPayment({
                order_id: id,
                amount: data.amount,
                paid_date: date,
            });
            enqueueSnackbar("Payment added successfully.", {
                variant: "success",
            });
            getAll();
            reset();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add Payment! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    return (
        <FormDialog
            buttonTitle="Add Payment"
            title="Add Payment"
            handleSubmit={handleSubmit(addPaymentHandler)}
            variant="contained"
        >
            <InputField
                control={control}
                errors={errors}
                name="amount"
                defaultValue=""
                variant="standard"
                label="Amount"
                register={register}
                error={errors.hasOwnProperty("amount")}
                helperText={errors.amount?.message}
            />
        </FormDialog>
    );
}
