import * as React from "react";
import Table from "../ReactTabel";
import ProdcutService from "../../services/ProductService";
import AddNewProduct from "./AddNewProduct";
import UpdateProduct from "./UpdateProduct";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddSupplier from "./AddSupplier";
import moment from "moment";
import CategoryService from "../../services/CategoryService";
import SuppliersService from "../../services/SupplierService";
import { Button, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../../store/PosRedux";
const columns = [
    { id: "id", label: "Code", minWidth: 100, align: "center" },
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "price", label: "Price", minWidth: 100, align: "center" },
    { id: "color", label: "Color", minWidth: 110, align: "center" },
    { id: "qty", label: "Quantity", minWidth: 100, align: "center" },
    { id: "weight", label: "Weight", minWidth: 100, align: "center" },
    { id: "totalPrice", label: "Total Price", minWidth: 100, align: "center" },
    { id: "date", label: "Date", minWidth: 100, align: "center" },
    {
        id: "action",
        direction: "row",
        label: "Action",
        maxWidth: 100,
        align: "center",
    },
];

export default function Products() {
    const [items, setItems] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const userRole = useSelector((state) => state.posRedux.userRole);
    const dispatch = useDispatch();
    React.useEffect(() => {
        getAll();
        getCategories();
        getSuppliers();
    }, []);

    const getCategories = async () => {
        try {
            const data = await CategoryService.getCategories();
            setItems((prev) => {
                return [...prev, data];
            });
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getSuppliers = async () => {
        try {
            const data = await SuppliersService.getSuppliers();
            setItems((prev) => {
                return [...prev, data];
            });
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getAll = async () => {
        try {
            const data = await ProdcutService.getProducts();
            setProducts(data);
            dispatch(getNotifications());
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const rows = products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            price: `${product.price} $`,
            color: product.color,
            qty: product.qty,
            weight: product.weight,
            date: moment(product.date).format("DD-MM-YYYY"),
            totalPrice: `$${product.totalPrice.toFixed(2)}`,
            action: (userRole === "owner" || userRole === "warehouse") && (
                <>
                    <Grid container spacing={0}>
                        <AddProduct
                            product={product}
                            getAll={getAll}
                            items={items}
                        />
                        <UpdateProduct
                            product={product}
                            getAll={getAll}
                            items={items}
                        />
                    </Grid>
                </>
            ),
        };
    });
    return (
        <>
            {(userRole === "warehouse" || userRole === "owner") && (
                <Grid container spacing={0}>
                    <Grid item>
                        {" "}
                        <AddNewProduct getAll={getAll} items={items} />
                    </Grid>
                    <Grid item>
                        {" "}
                        <AddCategory getAll={getAll} />
                    </Grid>{" "}
                    <Grid item>
                        {" "}
                        <AddSupplier getAll={getAll} />
                    </Grid>
                </Grid>
            )}
            <Table columns={columns} rows={rows} />
        </>
    );
}
