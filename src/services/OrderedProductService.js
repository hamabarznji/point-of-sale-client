import axios from "axios";

class OrderedProductService {
    async addOrder(data) {
        const res = await axios.post(
            "http://localhost:3002/orderedproducts",
            data,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );
        return res.data;
    }
    async getOrderedProducts(orderId) {
        const res = await axios.get(
            `http://localhost:3002/orderedproducts/orders/${orderId}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );

        return res.data;
    }
}

export default new OrderedProductService();
