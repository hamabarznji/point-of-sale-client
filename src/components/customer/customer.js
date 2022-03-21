import * as React from "react";
import Table from "../ReactTabel";
import CustomerService from "../../services/CustomerService";
import StoreService from "../../services/StoreService";

import AddCustomer from "./AddCustomer";
import UpdateCustomer from "./UpdateCustomer";

const columns = [
    { id: "id", label: "Phone", minWidth: 170, align: "center" },
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "address", label: "Address", minWidth: 170, align: "center" },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];

export default function Customers() {
    const [customers, setCustomers] = React.useState([]);
    const [stores, setStores] = React.useState([]);

    React.useEffect(() => {
        getAll();
        getStores();
    }, []);

    const getAll = async () => {
        try {
            const data = await CustomerService.getCustomers();
            setCustomers(data);
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
    const rows = customers.map((customer) => {
        return {
            id: customer.id,
            name: customer.name,
            address: customer.address,
            action: (
                <UpdateCustomer
                    customer={customer}
                    items={stores}
                    getAll={getAll}
                />
            ),
        };
    });

    return (
        <>
            <AddCustomer getAll={getAll} items={stores} />
            <Table columns={columns} rows={rows} isPath={false} />
        </>
    );
}
