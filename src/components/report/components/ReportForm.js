import InputField from "../../InputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../../Form";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function ReportForm({ onSubmit }) {
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

    return (
        <>
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
                                error={errors.hasOwnProperty("fromDate")}
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
        </>
    );
}
