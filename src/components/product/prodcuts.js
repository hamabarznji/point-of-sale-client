import * as React from "react";
import Table from "../ReactTabel";
import ProdcutService from "../../services/ProductService";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import moment from "moment";
import CategoryService from "../../services/CategoryService";
import SuppliersService from "../../services/SupplierService";

const columns = [
    { id: "id", label: "Code", minWidth: 100, align: "center" },
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "price", label: "Price", minWidth: 100, align: "center" },
    { id: "color", label: "Color", minWidth: 110, align: "center" },
    { id: "qty", label: "Quantity", minWidth: 100, align: "center" },
    { id: "size", label: "Size", minWidth: 100, align: "center" },
    { id: "weight", label: "Weight", minWidth: 100, align: "center" },
    { id: "date", label: "Date", minWidth: 100, align: "center" },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
];

export default function Products() {
    const [items, setItems] = React.useState([]);
    const [products, setProducts] = React.useState([]);

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
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };

    console.log({ items });
    const rows = products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            price: `${product.price} $`,
            color: product.color,
            qty: product.qty,
            size: product.size,
            weight: product.weight,
            date: moment(product.date).format("DD-MM-YYYY"),

            action: (
                <div>
                    <UpdateProduct
                        product={product}
                        getAll={getAll}
                        items={items}
                    />
                </div>
            ),
        };
    });

    return (
        <>
            <AddProduct getAll={getAll} items={items} />
            <Table columns={columns} rows={rows} />
        </>
    );
}
