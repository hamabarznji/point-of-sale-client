import * as React from "react";
import Table from "../ReactTabel";
import CustomerService from "../../services/CustomerService";
import StoreService from "../../services/StoreService";
import AddCustomer from "./AddCustomer";
import UpdateCustomer from "./UpdateCustomer";
import { useQuery } from "react-query";

const columns = [
    { id: "id", label: "Phone", minWidth: 170, align: "center" },
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "address", label: "Address", minWidth: 170, align: "center" },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];

export default function Customers() {
    const userRole = localStorage.getItem("userRole");

    const getAll = async () => {
        try {
            return CustomerService.getCustomers();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const { data: customers, refetch: refetchCustomer } = useQuery(
        "customers",
        getAll,
        {
            initialData: [],
            keepPreviousData: true,
            enabled: true,
        }
    );
    const rows = customers?.map((customer) => {
        return {
            id: customer.id,
            name: customer.name,
            address: customer.address,
            path: `customers/${customer.id}`,
            action: (
                <UpdateCustomer customer={customer} getAll={refetchCustomer} />
            ),
        };
    });

    return (
        <>
            {userRole === "accountant" && (
                <AddCustomer getAll={refetchCustomer} />
            )}
            <Table columns={columns} rows={rows ? rows : []} isPath={true} />
        </>
    );
}

// <AddCustomer getAll={getAll} items={stores} />
