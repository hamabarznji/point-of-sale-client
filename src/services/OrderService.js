import axios from "axios";

class OrderService {
    async addOrder(data) {
        const res = await axios.post("http://localhost:3002/orders", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }

    async gerOrders() {
        const res = await axios.get(
            `http://localhost:3002/orders/stores/${localStorage.getItem(
                "storeId"
            )}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );
        return res.data;
    }
}

export default new OrderService();
