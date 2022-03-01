import axios from "axios";

class CustomerService {
    async getCustomers() {
        const res = await axios.get("http://localhost:3002/customers", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }
    async getCustomer(id) {
        const res = await axios.get(
            `http://localhost:3002/customers/customer/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );
        return res.data;
    }

    async addCustomer(data) {
        await axios.post(
            "http://localhost:3002/customers/addcustomer",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            },
            data
        );
    }
    async updateCustomer(data) {
        await axios.put(
            `http://localhost:3002/customers/updatecustomer/${data.id}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            },
            data
        );
    }
}

export default new CustomerService();
