import ReportTable from "./components/ReportTable";
import { Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Chip from "./components/Chip";
import ReportService from "../.././services/ReportService";

const dummyData = [
    {
        id: "1",
        name: "Aluminum",
        quantity: "0",
        price: "4",
        totalPrice: "400",
        weight: "100",
        color: "Gold",
    },
];
const columns = [
    { id: "name", label: "Product Name", minWidth: 170, align: "center" },
    { id: "weight", label: "Weight", minWidth: 100, align: "center" },
    { id: "quantity", label: "Quantity", minWidth: 100, align: "center" },
    { id: "color", label: "Color", minWidth: 110, align: "center" },
    { id: "price", label: "Price", minWidth: 100, align: "center" },
    { id: "totalPrice", label: "Total Price", minWidth: 100, align: "center" },
];
export default function Warehouse() {
    const location = useLocation();
    // const path = `expenses/stores/${localStorage.getItem("storeId")}/reports/${
    //     location.state.fromDate
    // }/${location.state.toDate}`;

    const chips = [
        {
            chipContent: "Total Products Amount",
            label: "5000000",
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
