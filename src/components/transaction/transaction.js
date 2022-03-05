import * as React from "react";
import Table from "../reactTabel";
import TransactionService from "../../services/transactionService";
import StoreService from "../../services/storeService";
import ProductService from "../../services/productService";
import AddTransaction from "./addTransaction";
import UpdateTransaction from "./updateTransaction";
import moment from "moment";
import { Button } from "@mui/material";

const columns = [
    { id: "store", label: "Store Name", minWidth: 170, align: "center" },
    { id: "product", label: "Product Name", minWidth: 170, align: "center" },
    { id: "weight", label: "Weight", minWidth: 170, align: "center" },
    { id: "qty", label: "Quantity", minWidth: 170, align: "center" },
    { id: "date", label: "Date", minWidth: 170, align: "center" },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
];

export default function Products() {
    const [items, setItems] = React.useState([]);
    const [transactions, setTransactions] = React.useState([]);

    React.useEffect(() => {
        getAll();
        getStores();
        getProducts();
    }, []);

    const getAll = async () => {
        try {
            const data = await TransactionService.getTransactions();
            setTransactions(data);
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getProducts = async () => {
        try {
            const data = await ProductService.getProducts();
            setItems((prev) => {
                return [...prev, data];
            });
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getStores = async () => {
        try {
            const data = await StoreService.getStores();
            setItems((prev) => {
                return [...prev, data];
            });
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const rows = transactions.map((transaction) => {
        return {
            id: transaction.id,
            store: transaction.storeName,
            product: transaction.productName,
            qty: transaction.qty,
            weight: transaction.weight,
            date: moment(transaction.date).format("YYYY-MM-DD"),

            action: (
                <div>
                    <UpdateTransaction
                        transaction={transaction}
                        items={items}
                        getAll={getAll}
                    />
                </div>
            ),
        };
    });
    return (
        <>
            <AddTransaction items={items} />

            <Table columns={columns} rows={rows} />
        </>
    );
}
