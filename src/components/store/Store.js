import Table from "../ReactTabel";
import React from "react";
import StoreService from "../../services/StoreService";
import AddStore from "./AddStore";
import UpdateStore from "./UpdateStore";
import { useQuery } from "react-query";
const columns = [
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "location", label: "Locaton", minWidth: 170, align: "center" },
    { id: "phone", label: "Phone", minWidth: 170, align: "center" },
    { id: "action", label: "Action", minWidth: 170, align: "center" },
];

export default function Store() {
    const getAll = async () => {
        try {
            return StoreService.getStores();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const { data: stores } = useQuery("stores", getAll, {
        initialData: [],
        keepPreviousData: true,
        enabled: true,
    });

    const rows = stores.map((store, index) => {
        return {
            key: { index },
            id: store.id,
            name: store.name,
            location: store.location,
            phone: store.phone,
            path: `stores/${store.id}`,
            action: (
                <UpdateStore store={store} items={stores} getAll={getAll} />
            ),
        };
    });
    return (
        <>
            <AddStore getAll={getAll} />
            <Table columns={columns} rows={rows} isPath={true} />
        </>
    );
}
