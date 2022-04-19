import FormDialog from ".././FormDialog";
import InputField from ".././InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import PaymentService from "../../services/PaymentService";
import moment from "moment";
export default function AddPayment({ orderId, getAll, dueAmount }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        order_id: yup.number("Order id is required"),
        amount: yup.number().required("Amount  is required"),
        date: yup.date().required("Date is required"),
    });
    //
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
        try {
            await PaymentService.addPayment({
                order_id: data.order_id,
                amount: data.amount,
                paid_date: moment(data.date).format("YYYY-MM-DD"),
            });
            getAll();
            reset();
            enqueueSnackbar("Payment added successfully.", {
                variant: "success",
            });
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add payment! Please try again.", {
                variant: "error",
            });
            return Promise.reject("Error", err);
        }
    };

    return (
        <>
            <FormDialog
                buttonTitle="Add Payment"
                title="Add Payment"
                handleSubmit={handleSubmit(addPaymentHandler)}
            >
                <InputField
                    control={control}
                    errors={errors}
                    name="order_id"
                    defaultValue={orderId}
                    variant="standard"
                    label="Order Id"
                    register={register}
                    error={errors.hasOwnProperty("order_id")}
                    helperText={errors.order_id?.message}
                    disabled
                />
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
                <InputField
                    control={control}
                    errors={errors}
                    name="date"
                    defaultValue={moment().format("YYYY-MM-DD")}
                    variant="standard"
                    label="Date"
                    register={register}
                    error={errors.hasOwnProperty("date")}
                    helperText={errors.date?.message}
                />
            </FormDialog>
        </>
    );
}
