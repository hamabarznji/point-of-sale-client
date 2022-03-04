import axios from "axios";

class TransactionService {
    async getTransactions() {
        const res = await axios.get("http://localhost:3002/transactions", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }

    async addTransaction(data) {
        await axios.post("http://localhost:3002/transactions", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
    async updateTransaction(data) {
        await axios.put(`http://localhost:3002/transactions/${data.id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
}

export default new TransactionService();
