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

    async addProduct(data) {
        await axios.post(
            "http://localhost:3002/prodcuts/addproduct",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            },
            data
        );
    }
    async updateProduct(data) {
        await axios.put(
            `http://localhost:3002/products/updateproduct/${data.id}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            },
            data
        );
    }
}

export default new ProdcutService();
