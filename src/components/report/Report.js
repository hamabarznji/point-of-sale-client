import { Grid } from "@mui/material";
import { TextField } from "@material-ui/core";

import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ReportForm from "./components/ReportForm";
import moment from "moment";

import Sale from "./Sale";
import Purchase from "./Purchase";
import Transaction from "./Transaction";

import { useNavigate } from "react-router-dom";

export default function Report() {
    const history = useNavigate();

    const reports = [
        { id: 1, name: "Sale Report", element: <Sale />, path: "debts" },
        { id: 2, name: "Purchase Report ", element: <Purchase /> },
        {
            id: 3,
            name: "Transaction Report ",
            element: <Transaction />,
        },
    ];
    const [report, setReport] = React.useState(reports[0].id);

    const handleChange = (event) => {
        const value = event.target.value ? event.target.value : "";
        setReport(value);
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();

        const foundedReport = reports.find((rep) => rep.id === report);
        const fromDate = moment(data.fromDate).format("YYYY-MM-DD");
        const toDate = moment(data.toDate).format("YYYY-MM-DD");

        history(foundedReport.path, {
            state: { fromDate, toDate },
        });

        /*     setElement(foundedReport.element);
        setIsElement(true); */
    };

    /*     const getReport = async () => {
        try {
            const res = await ReportService.getReport(
                "expenses/stores/1/reports/2021-08-09 21/2022-04-01"
            );
            setReportDetails(res);
            console.log(reportDetails, "reportDetails");
            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject("Error", err);
        }
    }; */
    return (
        <>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item container>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            select
                            onChange={handleChange}
                            value={report}
                            defaultValue={reports[0].id}
                            style={{
                                width: "80%",
                                marginLeft: "10rem",
                            }}
                        >
                            {reports.map((option, index) => (
                                <MenuItem
                                    key={index}
                                    value={option.id}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>

                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ReportForm onSubmit={onSubmit} />
                </Grid>
            </Grid>
        </>
    );
}
