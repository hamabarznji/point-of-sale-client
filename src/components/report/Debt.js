import ReportTable from "./components/ReportTable";
import { Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Chip from "./components/Chip";
import ReportService from "../.././services/ReportService";

const dummyData = [
    {
        id: "1",
        customerName: "Ahmad",
        phone: "12223444",
        debtAmount: "4000",
        lastPaidAmount: "400",
        lastPaidDate: "2020-01-01",
    },
    {
        id: "2",
        customerName: "Ahmad",
        phone: "12223444",
        debtAmount: "4000",
        lastPaidAmount: "400",
        lastPaidDate: "2020-01-01",
    },
];
const columns = [
    {
        id: "customerName",
        label: "Customer Name",
        minWidth: 170,
        align: "center",
    },
    { id: "phone", label: "Phone", minWidth: 170, align: "center" },
    { id: "debtAmount", label: "Debt Amount", minWidth: 170, align: "center" },
    {
        id: "lastPaidAmount",
        label: "Last Paid Amount",
        minWidth: 170,
        align: "center",
    },
    {
        id: "lastPaidDate",
        label: "Last Paid Date",
        minWidth: 170,
        align: "center",
    },
];
export default function Debt() {
    const location = useLocation();
    // const path = `expenses/stores/${localStorage.getItem("storeId")}/reports/${
    //     location.state.fromDate
    // }/${location.state.toDate}`;

    const chips = [
        {
            chipContent: "Store Name",
            label: "Store Name",
        },
        {
            chipContent: "Total Debt Amount",
            label: "$5000",
        },
    ];
    return (
        <Grid container direction="row">
            <Grid item xs={10}>
                <Chip chips={chips} />
            </Grid>
            <Grid item xs={12}>
                <ReportTable columns={columns} rows={dummyData} />
            </Grid>
        </Grid>
    );
}
