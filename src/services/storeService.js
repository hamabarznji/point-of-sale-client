import axios from "axios";

class StoreService {
    async getStores() {
        const res = await axios.get("http://localhost:3002/stores");
        return res.data;
    }

    async addStore(data) {
        await axios.post("http://localhost:3002/stores/addstore", data);
    }
}

export default new StoreService();
