import axios from "axios";

class ProdcutService {
    async getProducts() {
        const res = await axios.get("http://localhost:3002/products", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }
    async getProduct(id) {
        const res = await axios.get(`http://localhost:3002/products/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }
    async getProductsNotifications() {
        const res = await axios.get(`http://localhost:3002/productss`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }

    async addProduct(data) {
        await axios.post("http://localhost:3002/prodcuts", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
    async updateProduct(data) {
        await axios.put(`http://localhost:3002/products/${data.id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
}

export default new ProdcutService();
