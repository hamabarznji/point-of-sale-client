import * as React from "react";
import CategoryService from "../../services/CategoryService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../FormDialog";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";
export default function AddCategory({ getAll }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const addCategoryHandler = async (data) => {
        try {
            await CategoryService.addCategory({
                name: data.name,
            });
            enqueueSnackbar("Category added successfully.", {
                variant: "success",
            });
            getAll();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add category! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    return (
        <FormDialog
            buttonTitle="Add Category"
            title="Add Category"
            handleSubmit={handleSubmit(addCategoryHandler)}
            variant="contained"
        >
            <InputField
                control={control}
                errors={errors}
                name="name"
                defaultValue=""
                variant="standard"
                label="Category Name"
                register={register}
                error={errors.hasOwnProperty("name")}
                helperText={errors.id?.message}
            />
        </FormDialog>
    );
}
