import * as React from "react";
import TransfareedProductService from "../../services/TransfareedProductService";
import FormDialog from "../FormDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";
import moment from "moment";

export default function UpdateTransfareedProduct({
    getAll,
    items,
    transfareedProduct,
}) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Id is required"),

        product_id: yup.number().required("Product name is required"),
        qty: yup.string().required("Quantity is required"),
        weight: yup.number().required("Weight is required"),
        date: yup.date().required("Date is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const updateTransfareedProductnHandler = async (data) => {
        try {
            await TransfareedProductService.updateTransfareedProduct({
                id: data.id,
                store_id: localStorage.getItem("storeId"),
                product_id: data.product_id,
                qty: data.qty,
                weight: data.weight,
                date: moment(data.date).format("YYYY-MM-DD"),
            });
            getAll();
            enqueueSnackbar("Transfareed product updated successfully", {
                variant: "success",
            });
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar(
                "Transfareed product is not updated! something went wrong.",
                {
                    variant: "error",
                }
            );

            return Promise.reject("Error", err);
        }
    };

    return (
        <FormDialog
            buttonTitle="Update"
            title="Update Transfareed Product"
            handleSubmit={handleSubmit(updateTransfareedProductnHandler)}
        >
            <InputField
                name="id"
                label="Id"
                defaultValue={transfareedProduct.id}
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("id")}
                helperText={errors.id?.message}
                disabled
            />
            <InputField
                name="product_id"
                label="Product Name"
                defaultValue={transfareedProduct.product_id}
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("product_id")}
                helperText={errors.product_id?.message}
                select
                items={items}
            />
            <InputField
                name="weight"
                label="Weight"
                defaultValue={transfareedProduct.weight}
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("weight")}
                helperText={errors.weight?.message}
            />
            <InputField
                name="qty"
                label="Quantity"
                control={control}
                defaultValue={transfareedProduct.qty}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("qty")}
                helperText={errors.qty?.message}
            />
            <InputField
                name="date"
                label="Date"
                defaultValue={moment(transfareedProduct.date).format(
                    "YYYY-MM-DD"
                )}
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("date")}
                helperText={errors.date?.message}
            />
        </FormDialog>
    );
}
