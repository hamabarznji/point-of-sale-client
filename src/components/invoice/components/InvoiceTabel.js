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
import TransfareedProductService from "../../../services/TransfareedProductService";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import InvoiceInputes from "./InvoiceInputes";
import Footer from "./Footer";
import TableHead from "./TableHead";
import totalPriceCalculator from "../../helper/totalPriceCalculator";
import { useRef } from "react";

export default function SpanningTable() {
    const [customers, setCustomers] = React.useState([]);
    const [store, setStore] = React.useState();
    const [selectedCustomer, setSelectedCustomer] = React.useState();
    const [ordredProducts, setOrderedProducts] = React.useState([]);
    const [transfareedProducts, setTransfareedProducts] = React.useState([]);
    const pnameRef = useRef();

    let tempProduct = [];
    // const [tempProduct, setTempProduct] = React.useState([]);
    const [tempQW, setTempQW] = React.useState({
        qty: 0,
        weight: 0,
    });
    const invoice = [];
    const [totalAmount, setTotalAmount] = React.useState(0);
    React.useEffect(() => {
        getCUstomers();
        getStore();
        getTransfareedProducts();
    }, []);
    const date = moment().format("YYYY-MM-DD");
    const history = useNavigate();

    const { enqueueSnackbar } = useSnackbar();
    const schema = yup.object().shape({
        customer: yup.string().required("Customer name is required"),
        transfareedProductId: yup.string().required("Product name is required"),
        color: yup.string().required("Color  is required"),
        price: yup.number().required("Price is required"),
        weight: yup.number().required("Weight is required"),
        qty: yup.number().required("Quantity id is required"),
        paidAmount: yup.number(),
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
    console.log(pnameRef);
    const getCUstomers = async () => {
        try {
            const results = await CustomerService.getCustomersForSpecificStore(
                localStorage.getItem("storeId")
            );
            setCustomers(results);
            return Promise.resolve(results);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getTransfareedProducts = async () => {
        try {
            const results =
                await TransfareedProductService.getTransfareedProducts(
                    localStorage.getItem("storeId")
                );

            results.map((item) => {
                return setTransfareedProducts((prev) => [
                    ...prev,
                    {
                        id: item.id,
                        name: item.productName,
                        weight: item.weight,
                        qty: item.qty,
                    },
                ]);
            });
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
    const addOrederedProductToInvoiceHandler = (data, e) => {
        e.preventDefault();
        try {
            if (data.weight > 0 && data.qty > 0) {
                enqueueSnackbar(
                    "A prduct cannot have weight and quantity at a time! !",
                    {
                        variant: "error",
                    }
                );
                throw new Error(
                    "A prduct cannot have weight and quantity at a time! ! "
                );
            }
            if (ordredProducts.length === 0) {
                setSelectedCustomer(data.customer);
            }

            tempProduct = transfareedProducts.filter((item) => {
                return item.id == data.transfareedProductId;
            });

            if (tempProduct[0].weight < data.weight) {
                enqueueSnackbar("No enough weight available!", {
                    variant: "error",
                });
                return;
            } else if (tempProduct[0].qty < data.qty) {
                enqueueSnackbar("No enough qunatity available!", {
                    variant: "error",
                });
                throw new Error("No enough qunatity available!");
            }

            setOrderedProducts((prev) => {
                return [...prev, data];
            });
        } catch (err) {
            console.log(err);
        } finally {
            tempProduct = [];
        }
    };

    const checkOutHandler = (data) => {
        if (ordredProducts.length === 0) {
            enqueueSnackbar("Please add some products");
        } else {
            invoice.push({
                orderInformation: {
                    store_id: localStorage.getItem("storeId"),
                    address: store.location,
                    phone: store.phone,
                    user_id: localStorage.getItem("userId"),
                    customer_id: selectedCustomer,
                    paidAmount: data.paidAmount,
                    date,
                    totalAmount,
                },

                ordredProducts: ordredProducts.map((item) => {
                    return {
                        transfareedProductId: item.transfareedProductId,
                        customer: item.customer,
                        color: item.color,
                        qty: item.qty,
                        price: item.price,
                        weight: item.weight,
                        totalAmount: totalPriceCalculator(
                            item.price,
                            item.weight,
                            item.qty
                        ),
                    };
                }),
            });

            setOrderedProducts([]);
            setTotalAmount(0);

            history("/dashboard/invoices/checkout", {
                state: { invoice },
            });
        }
    };

    const isInvoice = ordredProducts.length > 0;
    return (
        <>
            <form onSubmit={handleSubmit(addOrederedProductToInvoiceHandler)}>
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
                            phone={store?.phone}
                            address={store?.location}
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
                                transfareedProducts={transfareedProducts}
                                items={transfareedProducts}
                                ref={pnameRef}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
            <Footer
                setOrderedProducts={setOrderedProducts}
                totalAmount={totalAmount}
                checkOutHandler={checkOutHandler}
                isInvoice={isInvoice}
                register={register}
                control={control}
                errors={errors}
                paidAmount={schema.paidAmount}
            />
        </>
    );
}
