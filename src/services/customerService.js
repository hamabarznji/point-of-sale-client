import axios from "axios";

class CustomerService {
    async getCustomers() {
        const res = await axios.get(
            `http://localhost:3002/customers/stores/${localStorage.getItem(
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
    async getCustomersForSpecificStore() {
        const res = await axios.get(
            `http://localhost:3002/customers/stores/${localStorage.getItem(
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
    async getCustomer(id) {
        const res = await axios.get(`http://localhost:3002/customers/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }
    async getCustomerReport(id) {
        const res = await axios.get(
            `http://localhost:3002/customers/${id}/reports`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );
        return res.data;
    }

    async addCustomer(data) {
        await axios.post("http://localhost:3002/customers", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
    async updateCustomer(data) {
        await axios.put(`http://localhost:3002/customers/${data.id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
}

export default new CustomerService();
