import * as React from "react";
import Table from "../reactTabel";
import ProdcutService from "../../services/productService";
import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";

const columns = [
    { id: "id", label: "Code", minWidth: 100, align: "center" },
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "price", label: "Price", minWidth: 100, align: "center" },
    { id: "color", label: "Color", minWidth: 110, align: "center" },
    { id: "qty", label: "Quantity", minWidth: 100, align: "center" },
    { id: "size", label: "Size", minWidth: 100, align: "center" },
    { id: "weight", label: "Weight", minWidth: 100, align: "center" },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
];

export default function Products() {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const data = await ProdcutService.getProducts();
            setProducts(data);
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const rows = products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            color: product.color,
            qty: product.qty,
            size: product.size,
            weight: product.weight,
            action: (
                <div>
                    <UpdateProduct product={product} getAll={getAll} />
                </div>
            ),
        };
    });
    return (
        <>
            <AddProduct getAll={getAll} />
            <Table columns={columns} rows={rows} />
        </>
    );
}
