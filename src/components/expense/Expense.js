import Table from "../ReactTabel";
import React from "react";
import ExpenseService from "../../services/ExpenseService";
import StoreService from "../../services/StoreService";
import Chip from "./Chip";
import AddExpense from "./AddExpense";
import UpdateExpense from "./UpdateExpense";
import { useQuery } from "react-query";
import moment from "moment";
import { useSelector } from "react-redux";

const columns = [
    { id: "storeName", label: "Store", minWidth: 170, align: "center" },
    { id: "description", label: "Description", minWidth: 170, align: "center" },
    { id: "amount", label: "Amount", minWidth: 170, align: "center" },
    { id: "date", label: "Date", minWidth: 170, align: "center" },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];

export default function Expense() {
    const [expenseReport, setExpenseReport] = React.useState({});
    const userRole = useSelector((state) => state.posRedux.userRole);

    const getAll = async () => {
        try {
            const data = await ExpenseService.getExpenses();
            const expnseLength = data.length;
            const total = data.reduce((acc, expense) => {
                return acc + expense.amount;
            }, 0);
            setExpenseReport({
                numberOfExpenses: expnseLength,
                totalExpensesAmount: total,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getStores = async () => {
        try {
            return StoreService.getStores();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const { data: expenses } = useQuery("expenses", getAll, {
        initialData: [],
        keepPreviousData: true,
        enabled: true,
    });
    const { data: stores } = useQuery("expenses", getStores, {
        initialData: [],
        keepPreviousData: true,
        enabled: true,
    });

    const rows = expenses.map((expense, index) => {
        return {
            key: { index },
            store_id: expense.store_id,
            storeName: expense.storeName,
            description: expense.description,
            amount: `$${expense.amount}`,
            date: moment(expense.date).format("YYYY-MM-DD"),
            action: <UpdateExpense expense={expense} getAll={getAll} />,
        };
    });
    return (
        <>
            <Chip
                totalExpensesAmount={expenseReport?.totalExpensesAmount}
                expensesLength={expenseReport?.numberOfExpenses}
            />
            {userRole === "accountant" && (
                <AddExpense getAll={getAll} items={stores} />
            )}
            <Table columns={columns} rows={rows} />
        </>
    );
}
