import React from "react";
import { useParams } from "react-router-dom";
import StoreService from "../../services/StoreService";
import ReactTable from "../ReactTabel";

/*     "id": 4,
        "store_id": 1,
        "product_id": 14,
        "qty": 0,
        "weight": 101,
        "color": "Cremy",
        "date": "2022-04-02T00:00:00.000Z",
        "storeName": "koya road",
        "productName": "Aluminum Cremy" */

const columns = [
    { id: "productName", label: "Name", minWidth: 170, align: "center" },

    {
        id: "qty",
        label: "Quantity",
        minWidth: 170,
        align: "center",
    },
    {
        id: "weight",
        label: "Weight",
        minWidth: 170,
        align: "center",
    },
    {
        id: "color",
        label: "Color",
        minWidth: 170,
        align: "center",
    },
];
export default function StoreReport() {
    const id = useParams().id;
    const [storeInfo, setStoreInfo] = React.useState([]);

    const getStoreInfo = async () => {
        try {
            const data = await StoreService.storeReportById(id);
            setStoreInfo(data);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    console.log(storeInfo);
    const rows = storeInfo?.map((row) => {
        return {
            productName: row.productName,
            qty: row.qty,
            weight: row.weight,
            color: row.color,
        };
    });

    React.useEffect(() => {
        getStoreInfo();
    }, []);

    return (
        <>
            <ReactTable columns={columns} rows={rows ? rows : []} />{" "}
        </>
    );
}
