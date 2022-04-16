import Table from "../ReactTabel";
import UserService from "../../services/UserService";
import React from "react";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import StoreService from "../../services/StoreService";
import { Grid } from "@mui/material";

const columns = [
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "role", label: "Role", minWidth: 170, align: "center" },
    { id: "store", label: "Store", minWidth: 170, align: "center" },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];

export default function User() {
    const [users, setUsers] = React.useState([]);
    const [stores, setStores] = React.useState([]);

    React.useEffect(() => {
        getAll();
        getStores();
    }, []);

    const getAll = async () => {
        try {
            const data = await UserService.getUsers();
            console.log(data, "here");
            setUsers(data);
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getStores = async () => {
        try {
            const data = await StoreService.getStores();
            setStores(data);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const rows = users.map((user, index) => {
        return {
            key: { index },
            id: user.id,
            name: user.username,
            role: user.role,
            store: user.storeName,
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
                    <Grid item>
                        <DeleteUser user={user} getAll={getAll} />
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
