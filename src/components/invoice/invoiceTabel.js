import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import InputField from "../inputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import RenderInvoices from "./renderInvoices";
import CustomeTableHead from "./tableHead";
import moment from "moment";
export default function SpanningTable() {
    const [invoices, setInvoices] = React.useState([]);
    const date = moment().format("YYYY-MM-DD");
    const enqueueSnackbar = useSnackbar();
    const schema = yup.object().shape({
        product: yup.string().required("Product name is required"),
        color: yup.string().required("Color  is required"),
        price: yup.number().required("Price is required"),
        weight: yup.number().required("Weight is required"),
        qty: yup.number().required("Quantity id is required"),
        size: yup.number().required("Size id is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // React.useEffect(() => {}, [invoices.length]);

    const onSubmit = (data, e) => {
        e.preventDefault();
        setInvoices((prev) => {
            return [...prev, data];
        });
    };
    const isInvoice = invoices.length > 0;
    console.log(invoices);

    const Inputs = () => (
        <TableRow>
            <TableCell align="center">
                <InputField
                    control={control}
                    errors={errors}
                    name="product"
                    defaultValue=""
                    variant="outlined"
                    label="Product Name"
                    register={register}
                    error={errors.hasOwnProperty("product")}
                    helperText={errors.product?.message}
                />
            </TableCell>{" "}
            <TableCell align="center">
                <InputField
                    control={control}
                    errors={errors}
                    name="price"
                    defaultValue=""
                    variant="outlined"
                    label="Price"
                    register={register}
                    error={errors.hasOwnProperty("price")}
                    helperText={errors.price?.message}
                />
            </TableCell>{" "}
            <TableCell align="center">
                <InputField
                    control={control}
                    errors={errors}
                    name="weight"
                    defaultValue=""
                    variant="outlined"
                    label="Weight"
                    register={register}
                    error={errors.hasOwnProperty("weight")}
                    helperText={errors.weight?.message}
                />
            </TableCell>{" "}
            <TableCell align="center">
                <InputField
                    control={control}
                    errors={errors}
                    name="qty"
                    defaultValue=""
                    variant="outlined"
                    label="Quantity"
                    register={register}
                    error={errors.hasOwnProperty("qty")}
                    helperText={errors.qty?.message}
                />
            </TableCell>{" "}
            <TableCell align="center">
                <InputField
                    control={control}
                    errors={errors}
                    name="color"
                    defaultValue=""
                    variant="outlined"
                    label="Color"
                    register={register}
                    error={errors.hasOwnProperty("color")}
                    helperText={errors.color?.message}
                />
            </TableCell>{" "}
            <TableCell align="center">
                <InputField
                    control={control}
                    errors={errors}
                    name="size"
                    defaultValue=""
                    variant="outlined"
                    label="Size"
                    register={register}
                    error={errors.hasOwnProperty("size")}
                    helperText={errors.size?.message}
                />
            </TableCell>
            <TableCell align="center">
                {<Button type="submit">Add</Button>}
            </TableCell>
        </TableRow>
    );
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TableContainer component={Paper}>
                    <Table
                        style={{
                            width: "90%",
                            height: "100%",
                            marginLeft: "5rem",
                        }}
                        aria-label="spanning table"
                    >
                        <TableHead>
                            <CustomeTableHead date={date} />
                            <TableRow
                                style={{
                                    background: "black",
                                }}
                            >
                                <TableCell
                                    align="center"
                                    style={{ color: "white" }}
                                >
                                    #
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ color: "white" }}
                                >
                                    Product Name
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ color: "white" }}
                                >
                                    Price
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ color: "white" }}
                                >
                                    Weight
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ color: "white" }}
                                >
                                    Quantity
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ color: "white" }}
                                >
                                    Color
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ color: "white" }}
                                >
                                    Size
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ color: "white" }}
                                >
                                    Total
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ color: "white" }}
                                ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isInvoice && (
                                <RenderInvoices invoices={invoices} />
                            )}

                            <TableRow style={{ background: "#EDE6D9" }}>
                                <TableCell>Total</TableCell>
                                <TableCell align="center">12344$</TableCell>
                            </TableRow>
                        </TableBody>
                        <Inputs />
                    </Table>
                </TableContainer>
            </form>
        </>
    );
}
