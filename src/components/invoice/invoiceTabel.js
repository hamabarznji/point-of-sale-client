import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import InputField from "../inputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import RenderOrderedProducts from "./renderOrderedProducts";
import CustomeTableHead from "./tableHead";
import ColumnName from "./columnName";
import CustomerService from "../../services/customerService";
import StoreService from "../../services/storeService";
import moment from "moment";

export default function SpanningTable() {
    const [customers, setCustomers] = React.useState([]);
    const [stores, setStores] = React.useState([]);
    const [ordredProducts, setOrderedProducts] = React.useState([]);
    const invoice = [];
    const [totalAmount, setTotalAmount] = React.useState(0);
    const date = moment().format("YYYY-MM-DD");

    const enqueueSnackbar = useSnackbar();
    const schema = yup.object().shape({
        product: yup.string().required("Product name is required"),
        color: yup.string().required("Color  is required"),
        price: yup.number().required("Price is required"),
        weight: yup.number().required("Weight is required"),
        qty: yup.number().required("Quantity id is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const getCUstomers = async () => {
        try {
            const results = await CustomerService.getCustomers();
            setCustomers(results);
            return Promise.resolve(results);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getStores = async () => {
        try {
            const results = await StoreService.getStores();
            setCustomers(results);
            return Promise.resolve(results);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const onSubmit = (data, e) => {
        e.preventDefault();
        setOrderedProducts((prev) => {
            return [...prev, data];
        });
        // reset({});
    };

    React.useEffect(() => {
        getCUstomers();
        getStores();
    }, []);

    const checkOutHandler = () => {
        if (ordredProducts.length === 0) {
            enqueueSnackbar("Please add some products");
        } else {
            invoice.push({ totalAmount, date, products: ordredProducts });
            console.log(invoice);
            setOrderedProducts([]);
            setTotalAmount(0);
        }
    };

    /* 
    const onSubmitInvoice = async (data, e) => { 
        e.preventDefault();
        const invoiceData = {
            customerId: data.customer,
            storeId: data.store,
            date: date,
            products: ordredProducts,
            totalAmount: totalAmount,
        };
        try {
            const results = await CustomerService.createInvoice(invoiceData);
            setInvoice(results);
            enqueueSnackbar("Invoice created successfully", {
                variant: "success",
            });
            reset();
            setOrderedProducts([]);
            setTotalAmount(0);
        } catch (err) {
            enqueueSnackbar("Error creating invoice", {
                variant: "error",
            });
        }
    } */
    const isInvoice = ordredProducts.length > 0;
    const Footer = () => {
        return (
            isInvoice && (
                <TableRow
                    style={{ background: "#EDE6D9" }}
                    setOrderedProducts={setOrderedProducts}
                >
                    <TableCell>
                        {" "}
                        <Typography variant="h5">Total:</Typography>{" "}
                    </TableCell>
                    <TableCell align="center">
                        <Typography variant="h5">${totalAmount}</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Button onClick={checkOutHandler}>Checkout</Button>
                    </TableCell>
                </TableRow>
            )
        );
    };
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
                            <ColumnName />
                        </TableHead>
                        <TableBody>
                            {isInvoice && (
                                <RenderOrderedProducts
                                    ordredProducts={ordredProducts}
                                    setTotalAmount={setTotalAmount}
                                    //productDeleteHandler={productDeleteHandler}
                                />
                            )}

                            <Footer />
                        </TableBody>
                        <Inputs />
                    </Table>
                </TableContainer>
            </form>
        </>
    );
}
