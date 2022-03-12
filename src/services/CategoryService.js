import axios from "axios";

class CategoryService {
    async getCategories() {
        const res = await axios.get("http://localhost:3002/categories", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }
}

export default new CategoryService();
