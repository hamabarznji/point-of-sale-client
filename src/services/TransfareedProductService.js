import axios from "axios";

class TransfareedProductService {
    async getTransfareedProducts() {
        const res = await axios.get(
            "http://localhost:3002/transfareedProducts",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );
        return res.data;
    }

    async addTransfareedProduct(data) {
        await axios.post("http://localhost:3002/transfareedproducts", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
    async updateTransfareedProduct(data) {
        await axios.put(
            `http://localhost:3002/transfareedproducts/${data.id}`,
            data,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );
    }
}

export default new TransfareedProductService();
