import * as React from "react";
import Table from "../ReactTabel";
import TransfareedProductService from "../../services/TransfareedProductService";
import ProductService from "../../services/ProductService";
import AddTransfareedProduct from "./AddTransfareedProduct";
import UpdateTransfareedProduct from "./UpdateTransfareedProduct";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../../store/PosRedux";
const columns = [
    { id: "store", label: "Store Name", minWidth: 170, align: "center" },
    { id: "product", label: "Product Name", minWidth: 170, align: "center" },
    { id: "weight", label: "Weight", minWidth: 170, align: "center" },
    { id: "qty", label: "Quantity", minWidth: 170, align: "center" },
    { id: "color", label: "Color", minWidth: 170, align: "center" },
    { id: "totalPriceAmount", label: "Total", minWidth: 170, align: "center" },
    { id: "date", label: "Date", minWidth: 170, align: "center" },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
];

export default function TransfareedProduct() {
    const [items, setItems] = React.useState([]);
    const [transfareedProducts, setTransfareedProducts] = React.useState([]);
    const storeId = useSelector((state) => state.posRedux.storeId);
    const userRole = useSelector((state) => state.posRedux.userRole);
    const dispatch = useDispatch();
    React.useEffect(() => {
        getAll();
        getProducts();
        dispatch(getNotifications());
    }, []);

    const getAll = async () => {
        try {
            if (userRole === "warehouse" || userRole === "owner") {
                const data =
                    await TransfareedProductService.getTransfareedProductsByStoreId();
                setTransfareedProducts(data);
                return Promise.resolve("done");
            } else {
                const data =
                    await TransfareedProductService.getTransfareedProductsByStoreId(
                        storeId
                    );
                setTransfareedProducts(data);
                return Promise.resolve("done");
            }
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getProducts = async () => {
        try {
            const data = await ProductService.getProducts();
            setItems(data);
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const rows = transfareedProducts?.map((transfareedProduct) => {
        return {
            storeId: transfareedProduct?.store_id,
            id: transfareedProduct.id,
            store: transfareedProduct?.storeName,
            product: transfareedProduct?.productName,
            qty: transfareedProduct?.qty,
            weight: transfareedProduct?.weight,
            color: transfareedProduct?.color,
            totalPriceAmount: `$${transfareedProduct?.totalPriceAmount}`,
            date: moment(transfareedProduct?.date).format("YYYY-MM-DD"),

            action: userRole === "owner" && (
                <div>
                    <UpdateTransfareedProduct
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
            {(userRole === "warehouse" || userRole === "owner") && (
                <AddTransfareedProduct items={items} getAll={getAll} />
            )}
            <Table columns={columns} rows={rows} />
        </>
    );
}
