import axios from "axios";

class SupplierService {
    async getSuppliers() {
        const res = await axios.get("http://localhost:3002/suppliers", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }
}

export default new SupplierService();
