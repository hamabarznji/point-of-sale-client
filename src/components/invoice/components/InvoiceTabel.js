import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import RenderOrderedProducts from "./RenderOrderedProducts";
import ColumnName from "./ColumnName";
import CustomerService from "../../../services/CustomerService";
import StoreService from "../../../services/StoreService";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import InvoiceInputes from "./InvoiceInputes";
import Footer from "./Footer";
import TableHead from "./TableHead";
export default function SpanningTable() {
    const [customers, setCustomers] = React.useState([]);
    const [store, setStore] = React.useState();
    const [ordredProducts, setOrderedProducts] = React.useState([]);
    const invoice = [];
    const [totalAmount, setTotalAmount] = React.useState(0);
    React.useEffect(() => {
        getCUstomers();
        getStore();
    }, []);
    const date = moment().format("YYYY-MM-DD");
    const history = useNavigate();

    const enqueueSnackbar = useSnackbar();
    const schema = yup.object().shape({
        customer: yup.string().required("Customer name is required"),
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
            const results = await CustomerService.getCustomersForSpecificStore(
                localStorage.getItem("storeId")
            );
            console.log(results);
            setCustomers(results);
            return Promise.resolve(results);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getStore = async () => {
        try {
            const results = await StoreService.getStore(
                localStorage.getItem("storeId")
            );
            setStore(results);
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

    const checkOutHandler = () => {
        if (ordredProducts.length === 0) {
            enqueueSnackbar("Please add some products");
        } else {
            invoice.push({ totalAmount, date, products: ordredProducts });
            console.log(invoice);
            setOrderedProducts([]);
            setTotalAmount(0);

            history("/dashboard/invoices/checkout", {
                state: { invoice },
            });
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
                        <TableHead
                            control={control}
                            errors={errors}
                            register={register}
                            customer={schema.cutomer}
                            customers={customers}
                            date={date}
                        ></TableHead>
                        <ColumnName />
                        <TableBody>
                            {isInvoice && (
                                <RenderOrderedProducts
                                    ordredProducts={ordredProducts}
                                    setTotalAmount={setTotalAmount}
                                    //productDeleteHandler={productDeleteHandler}
                                />
                            )}

                            <InvoiceInputes
                                register={register}
                                control={control}
                                errors={errors}
                                color={schema.color}
                                product={schema.product}
                                price={schema.price}
                                weight={schema.weight}
                                qty={schema.qty}
                            />
                            <Footer
                                setOrderedProducts={setOrderedProducts}
                                totalAmount={totalAmount}
                                checkOutHandler={checkOutHandler}
                                isInvoice={isInvoice}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </>
    );
}
