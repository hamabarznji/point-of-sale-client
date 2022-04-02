import axios from "axios";

class ExpenseService {
    async getExpenses() {
        const res = await axios.get(
            `http://localhost:3002/expenses/stores/${localStorage.getItem(
                "storeId"
            )}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );
        return res.data;
    }
    async getExpense(id) {
        const res = await axios.get(
            `http://localhost:3002/expenses/expense/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );
        return res.data;
    }

    async addExpense(data) {
        await axios.post("http://localhost:3002/expenses", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
    async updateExpense(data) {
        await axios.put(
            `http://localhost:3002/expenses/${data.id}`,
            data,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            },
            data
        );
    }
}

export default new ExpenseService();
