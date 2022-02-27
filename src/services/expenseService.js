import axios from "axios";

class ExpenseService {
    async getExpenses() {
        const res = await axios.get("http://localhost:3002/expenses");
        return res.data;
    }
    async getExpense(id) {
        const res = await axios.get(
            `http://localhost:3002/expenses/expense/${id}`
        );
        return res.data;
    }

    async addExpense(data) {
        await axios.post("http://localhost:3002/expenses/addexpense", data);
    }
    async updateExpense(data) {
        await axios.put(
            `http://localhost:3002/expenses/updateexpense/${data.id}`,
            data
        );
    }
}

export default new ExpenseService();
