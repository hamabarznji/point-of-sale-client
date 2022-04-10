import { Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Chip from "./components/Chip";
import ReportService from "../.././services/ReportService";
import React from "react";
import ReportTable from "./components/ReportTable";
import moment from "moment";
const columns = [
    { id: "description", label: "Description", minWidth: 170, align: "center" },
    { id: "amount", label: "Amount", minWidth: 170, align: "center" },
    { id: "date", label: "Date", minWidth: 170, align: "center" },
];

export default function Expense() {
    const [expenses, setExpenses] = React.useState([]);
    const [expenseSummary, setExpenseSummary] = React.useState();
    const location = useLocation();
    const path = `expenses/stores/${localStorage.getItem("storeId")}/reports/${
        location.state.fromDate
    }/${location.state.toDate}`;
    React.useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = async () => {
        try {
            const data = await ReportService.getReport(path);
            setExpenses(data.expenses);
            setExpenseSummary({
                storeName: data.storeName,
                numberOfExpenses: data.numberOfExpenses,
                totalExpensesAmount: data.totalExpensesAmount,
            });
            console.log(data, "data");
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const chips = [
        {
            chipContent: "Store Name",
            label: expenseSummary?.storeName,
        },
        {
            chipContent: "Number of expenses",
            label: expenseSummary?.numberOfExpenses,
        },
        {
            chipContent: "Total Expenses Amount",
            label: expenseSummary?.totalExpensesAmount,
        },
    ];
    const rows = expenses.map((expense) => ({
        description: expense.description,
        amount: expense.amount,
        date: moment(expense.date).format("YYYY-MM-DD"),
    }));

    return (
        <Grid container direction="row">
            <Grid item>
                <Chip chips={chips} />
            </Grid>
            <Grid item xs={12}>
                <ReportTable columns={columns} rows={rows} />
            </Grid>
        </Grid>
    );
}
