import * as React from "react";
import Table from "../reactTabel";
import CustomerService from "../../services/customerService";

import AddCustomer from "./addCustomer";
import UpdateCustomer from "./updateCustomer";

const columns = [
    { id: "id", label: "Phone", minWidth: 170, align: "center" },
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "address", label: "Address", minWidth: 170, align: "center" },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];

export default function Customers() {
    const [customers, setCustomers] = React.useState([]);

    const rows = customers.map((customer) => {
        return {
            id: customer.id,
            name: customer.name,
            address: customer.address,
            action: <UpdateCustomer customer={customer} />,
        };
    });

    React.useEffect(() => {
        getAll();
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

    return (
        <>
            <AddCustomer getAll={getAll} />
            <Table columns={columns} rows={rows} />
        </>
    );
}
