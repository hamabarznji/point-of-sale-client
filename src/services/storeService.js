import axios from "axios";

class StoreService {
    async getStores() {
        const res = await axios.get("http://localhost:3002/stores", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }

    async addStore(data) {
        await axios.post("http://localhost:3002/stores", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
    async updateStore(data) {
        await axios.put(`http://localhost:3002/stores/${data.id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
}

export default new StoreService();
