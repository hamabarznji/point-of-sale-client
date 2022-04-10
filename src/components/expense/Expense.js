import Table from "../ReactTabel";
import React from "react";
import ExpenseService from "../../services/ExpenseService";
import StoreService from "../../services/StoreService";

import AddExpense from "./AddExpense";
import UpdateExpense from "./UpdateExpense";
import moment from "moment";
const columns = [
    { id: "storeName", label: "Store", minWidth: 170, align: "center" },
    { id: "description", label: "Description", minWidth: 170, align: "center" },
    { id: "amount", label: "Amount", minWidth: 170, align: "center" },
    { id: "date", label: "Date", minWidth: 170, align: "center" },
];

export default function Expense() {
    const [expenses, setExpenses] = React.useState([]);
    const [stores, setStores] = React.useState([]);

    React.useEffect(() => {
        getAll();
        getStores();
    }, []);

    const getAll = async () => {
        try {
            const data = await ExpenseService.getExpenses();
            setExpenses(data);
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
    const rows = expenses.map((expense, index) => {
        return {
            key: { index },
            store_id: expense.store_id,
            storeName: expense.storeName,
            description: expense.description,
            amount: expense.amount,
            date: moment(expense.date).format("YYYY-MM-DD"),
            action: <UpdateExpense expense={expense} items={stores} />,
        };
    });

    return (
        <>
            <AddExpense getAll={getAll} items={stores} />
            <Table columns={columns} rows={rows} />
        </>
    );
}
