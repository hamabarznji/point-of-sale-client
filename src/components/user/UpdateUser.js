import * as React from "react";
import UserService from "../../services/UserService";
import FormDialog from "../FormDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";
import StoreSevice from "../../services/StoreService";

const roles = [
    { id: "owner", name: "Owner" },
    { id: "accountant", name: "Accountant" },
    { id: "warehouse", name: "Warehouse" },
];

export default function UpdateUser({ user }) {
    const { enqueueSnackbar } = useSnackbar();
    const [stores, setStores] = React.useState([]);
    const schema = yup.object().shape({
        id: yup.number().required("Phone number is required"),
        username: yup.string().required("Name is required"),
        password: yup.string(),
        role: yup.string().required("Role id is required"),
        store_id: yup.number().required("Store  id is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const updateUserHandler = async (data) => {
        try {
            await UserService.updateUser(data);

            enqueueSnackbar("User updated successfully", {
                variant: "success",
            });

            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("User is not updated! something went wrong.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    const getStores = async () => {
        try {
            const data = await StoreSevice.getStores();
            setStores(data);
            return Promise.resolve("Done");
        } catch (err) {
            return Promise.reject("Error", err);
        }
    };

    React.useEffect(() => {
        getStores();
    }, []);

    console.log(stores);
    return (
        <>
            <FormDialog
                title="Update User"
                handleSubmit={handleSubmit(updateUserHandler)}
                buttonTitle="Update"
            >
                <InputField
                    name="id"
                    label="Id"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={user.id}
                    disabled
                />
                <InputField
                    name="username"
                    label="Name"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={user.username}
                    error={errors.hasOwnProperty("username")}
                    helperText={errors.username?.message}
                />
                <InputField
                    name="password"
                    label="Password"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={user.password}
                    error={errors.hasOwnProperty("password")}
                    helperText={errors.password?.message}
                />
                <InputField
                    name="role"
                    label="Role"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={user.role}
                    error={errors.hasOwnProperty("role")}
                    helperText={errors.role?.message}
                    select
                    items={roles}
                />
                <InputField
                    name="store_id"
                    label="Store id"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={user.store_id}
                    error={errors.hasOwnProperty("store_id")}
                    helperText={errors.store_id?.message}
                    select
                    items={stores}
                />
            </FormDialog>
        </>
    );
}
