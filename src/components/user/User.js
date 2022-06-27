import Table from "../ReactTabel";
import UserService from "../../services/UserService";
import React from "react";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import StoreService from "../../services/StoreService";
import { Grid } from "@mui/material";
import { useQuery } from "react-query";

const columns = [
    { id: "username", label: "Name", minWidth: 170, align: "center" },
    { id: "role", label: "Role", minWidth: 170, align: "center" },
    { id: "storeName", label: "Store", minWidth: 170, align: "center" },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];

export default function User() {
    const [stores, setStores] = React.useState([]);

    React.useEffect(() => {
        getStores();
    }, []);

    console.log(stores);
    const getAll = async () => {
        try {
            return UserService.getUsers();
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getStores = async () => {
        try {
            const data = await StoreService.getStores();
            setStores(data);
            stores.add({
                id: "null",
                name: "default",
            });
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const { data: users } = useQuery("stores", getAll, {
        initialData: [],
        keepPreviousData: true,
        enabled: true,
    });

    const rows = users.map((user, index) => {
        return {
            key: { index },
            id: user.id,
            username: user.username,
            role: user.role,
            storeName: user.storeName,
            action: (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <UpdateUser user={user} getAll={getAll} />
                    </Grid>
                </Grid>
            ),
        };
    });

    return (
        <>
            <AddUser getAll={getAll} items={stores} />
            <Table rows={rows} columns={columns} />
        </>
    );
}
