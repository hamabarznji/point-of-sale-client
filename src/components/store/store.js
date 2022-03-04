import Table from "../reactTabel";
import React from "react";
import StoreService from "../../services/storeService";
import AddStore from "./addStore";
import UpdateStore from "./updateStore";
const columns = [
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "location", label: "Locaton", minWidth: 170, align: "center" },
    { id: "phone", label: "Phone", minWidth: 170, align: "center" },
    { id: "action", label: "Action", minWidth: 170, align: "center" },
];

export default function Expense() {
    const [stores, setStores] = React.useState([]);

    React.useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const data = await StoreService.getStores();
            setStores(data);
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const rows = stores.map((store, index) => {
        return {
            key: { index },
            id: store.id,
            name: store.name,
            location: store.location,
            phone: store.phone,
            action: (
                <UpdateStore store={store} items={stores} getAll={getAll} />
            ),
        };
    });
    return (
        <>
            <AddStore getAll={getAll} />
            <Table columns={columns} rows={rows} />
        </>
    );
}
