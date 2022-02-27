import axios from "axios";

class StoreService {
    async getStores() {
        const res = await axios.get("http://localhost:3002/stores");
        return res.data;
    }
    async getStore(id) {
        const res = await axios.get(`http://localhost:3002/stores/store/${id}`);
        return res.data;
    }

    async addStore(data) {
        await axios.post("http://localhost:3002/store/addstore", data);
    }
    async updateStore(data) {
        await axios.put(
            `http://localhost:3002/stores/updatestore/${data.id}`,
            data
        );
    }
}

export default new StoreService();
