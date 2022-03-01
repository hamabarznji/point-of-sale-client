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
        await axios.post(
            "http://localhost:3002/stores/addstore",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            },
            data
        );
    }
}

export default new StoreService();
