import * as React from "react";
import Table from "../ReactTabel";
import TransfareedProductService from "../../services/TransfareedProductService";
import StoreService from "../../services/StoreService";
import ProductService from "../../services/ProductService";
import AddTransaction from "./AddTransfareedProduct";
import UpdateTransaction from "./UpdateTransfareedProduct";
import moment from "moment";

const columns = [
    { id: "store", label: "Store Name", minWidth: 170, align: "center" },
    { id: "product", label: "Product Name", minWidth: 170, align: "center" },
    { id: "weight", label: "Weight", minWidth: 170, align: "center" },
    { id: "qty", label: "Quantity", minWidth: 170, align: "center" },
    { id: "color", label: "Color", minWidth: 170, align: "center" },
    { id: "date", label: "Date", minWidth: 170, align: "center" },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
];

export default function TransfareedProduct() {
    const [items, setItems] = React.useState([]);
    const [transfareedProducts, setTransfareedProducts] = React.useState([]);

    React.useEffect(() => {
        getAll();
        getStores();
        getProducts();
    }, []);

    const getAll = async () => {
        try {
            const data =
                await TransfareedProductService.getTransfareedProduct();
            setTransfareedProducts(data);
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getProducts = async () => {
        try {
            const data = await ProductService.getProducts();
            setItems((prev) => {
                return [...prev, data];
            });
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getStores = async () => {
        try {
            const data = await StoreService.getStores();
            setItems((prev) => {
                return [...prev, data];
            });
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const rows = transfareedProducts.map((transfareedProduct) => {
        return {
            id: transfareedProduct.id,
            store: transfareedProduct.storeName,
            product: transfareedProduct.productName,
            qty: transfareedProduct.qty,
            weight: transfareedProduct.weight,
            color: transfareedProduct.color,
            date: moment(transfareedProduct.date).format("YYYY-MM-DD"),

            action: (
                <div>
                    <UpdateTransaction
                        transfareedProduct={transfareedProduct}
                        items={items}
                        getAll={getAll}
                    />
                </div>
            ),
        };
    });
    return (
        <>
            <AddTransaction items={items} />

            <Table columns={columns} rows={rows} />
        </>
    );
}
