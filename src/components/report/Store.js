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
    {
        id: "2",
        name: "Aluminum2",
        quantity: "0",
        price: "4",
        totalPrice: "400",
        weight: "100",
        color: "Black",
    },
    {
        id: "3",
        name: "Aluminum3",
        quantity: "0",
        price: "4",
        totalPrice: "400",
        weight: "100",
        color: "White",
    },
    {
        id: "4",
        name: "Pvc1",
        quantity: "100",
        price: "4",
        totalPrice: "400",
        weight: "0",
        color: "White",
    },
    {
        id: "5",
        name: "Pvc2",
        quantity: "100",
        price: "4",
        totalPrice: "400",
        weight: "0",
        color: "Black",
    },
];
const columns = [
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "weight", label: "Weight", minWidth: 170, align: "center" },
    { id: "quantity", label: "quantity", minWidth: 170, align: "center" },
    { id: "price", label: "Price", minWidth: 170, align: "center" },
    { id: "totalPrice", label: "Ttotal Price", maxWidth: 170, align: "center" },
    { id: "color", label: "Color", minWidth: 170, align: "center" },
];
export default function Store() {
    const location = useLocation();
    // const path = `expenses/stores/${localStorage.getItem("storeId")}/reports/${
    //     location.state.fromDate
    // }/${location.state.toDate}`;

    const chips = [
        {
            chipContent: "Store Name",
            label: "Store Name",
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
