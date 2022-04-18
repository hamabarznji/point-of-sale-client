import { Button, Grid } from "@mui/material";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ReportForm from "./components/ReportForm";
import moment from "moment";

import Sale from "./Sale";
import Purchase from "./Purchase";
import Transaction from "./Transaction";

import { useNavigate } from "react-router-dom";
import InputField from "../InputField";

export default function Report() {
    const history = useNavigate();
    const schema = yup.object().shape({
        fromDate: yup.date().required("From date is required"),
        toDate: yup.date().required("To date is required"),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
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
    };

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

                <Grid item>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid
                                item
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={4}
                            >
                                <Grid item>
                                    Form Date
                                    <InputField
                                        control={control}
                                        errors={errors}
                                        name="fromDate"
                                        defaultValue=""
                                        register={register}
                                        error={errors.hasOwnProperty(
                                            "fromDate"
                                        )}
                                        helperText={errors.fromDate?.message}
                                        type="date"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    To Date
                                    <InputField
                                        control={control}
                                        errors={errors}
                                        name="toDate"
                                        defaultValue=""
                                        variant="outlined"
                                        register={register}
                                        error={errors.hasOwnProperty("toDate")}
                                        helperText={errors.toDate?.message}
                                        type="date"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                >
                                    Generate Report
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}
