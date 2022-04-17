import * as React from "react";
import TransfareedProductService from "../../services/TransfareedProductService";
import StoreService from "../../services/StoreService";
import FormDialog from "../FormDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";
import moment from "moment";

export default function AddTransfareedProduct({ getAll, items }) {
    const { enqueueSnackbar } = useSnackbar();
    const [stores, setStores] = React.useState([]);

    const schema = yup.object().shape({
        product_id: yup.number().required("Product name is required"),
        qty: yup.string().required("Quantity is required"),
        weight: yup.number().required("Weight is required"),
        storeId: yup.number().required("Store is required"),
        date: yup.date().required("Date is required"),
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
    const getStores = async () => {
        try {
            const data = await StoreService.getStores();
            setStores(data);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    React.useEffect(() => {
        getStores();
    }, []);
    console.log(stores);

    const transfareedProductHandler = async (data) => {
        try {
            await TransfareedProductService.addTransfareedProduct({
                store_id: data.storeId,
                product_id: data.product_id,
                qty: data.qty,
                weight: data.weight,
                date: moment(data.date).format("YYYY-MM-DD"),
            });
            getAll();
            reset();

            enqueueSnackbar("Product added successfully", {
                variant: "success",
            });
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Product is not added! something went wrong.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };

    return (
        <FormDialog
            buttonTitle="Transfarre Product"
            title="Transfarre Product"
            handleSubmit={handleSubmit(transfareedProductHandler)}
        >
            <InputField
                name="storeId"
                label="Store Name"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("storeId")}
                helperText={errors.storeId?.message}
                select
                items={stores}
            />{" "}
            <InputField
                name="product_id"
                label="Product Name"
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
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("qty")}
                helperText={errors.qty?.message}
            />
            <InputField
                name="date"
                label="Date"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("date")}
                helperText={errors.date?.message}
                defaultValue={moment().format("YYYY-MM-DD")}
            />
        </FormDialog>
    );
}
