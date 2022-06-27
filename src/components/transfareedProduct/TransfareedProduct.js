import * as React from "react";
import Table from "../ReactTabel";
import TransfareedProductService from "../../services/TransfareedProductService";
import ProductService from "../../services/ProductService";
import AddTransfareedProduct from "./AddTransfareedProduct";
import UpdateTransfareedProduct from "./UpdateTransfareedProduct";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../../store/PosRedux";
import { useQuery } from "react-query";

export default function TransfareedProduct() {
    const [items, setItems] = React.useState([]);
    const storeId = useSelector((state) => state.posRedux.storeId);
    const userRole = useSelector((state) => state.posRedux.userRole);
    const dispatch = useDispatch();
    React.useEffect(() => {
        getProducts();
        dispatch(getNotifications());
    }, [dispatch]);
    const columns = [
        { id: "store", label: "Store Name", minWidth: 170, align: "center" },
        {
            id: "product",
            label: "Product Name",
            minWidth: 170,
            align: "center",
        },
        { id: "weight", label: "Weight", minWidth: 170, align: "center" },
        { id: "qty", label: "Quantity", minWidth: 170, align: "center" },
        { id: "color", label: "Color", minWidth: 170, align: "center" },
        {
            id: "totalPriceAmount",
            label: "Total",
            minWidth: 170,
            align: "center",
        },
        { id: "date", label: "Date", minWidth: 170, align: "center" },
        userRole === "warehouse" && {
            id: "action",
            label: "Action",
            minWidth: 100,
            align: "center",
        },
    ];

    const getAll = async () => {
        if (userRole == "warehouse") {
            try {
                return TransfareedProductService.getTransfareedProductsByStoreId(
                    "null"
                );
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            try {
                return TransfareedProductService.getTransfareedProductsByStoreId(
                    storeId
                );
            } catch (err) {
                return Promise.reject(err);
            }
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

    const { data: transfareedProducts, refetch: getAllRefetch } = useQuery(
        "products",
        getAll,
        {
            enabled: true,
            keepPreviousData: true,
            initialData: [],
        }
    );

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

            action: userRole === "warehouse" && (
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
            {userRole === "warehouse" && (
                <AddTransfareedProduct items={items} getAll={getAllRefetch} />
            )}
            <Table columns={columns} rows={rows} />
        </>
    );
}
