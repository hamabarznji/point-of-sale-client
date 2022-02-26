import axios from "axios";

class CustomerService {
    async getCustomers() {
        const res = await axios.get("http://localhost:3002/customers");
        return res.data;
    }
    async getCustomer(id) {
        const res = await axios.get(
            `http://localhost:3002/customers/customer/${id}`
        );
        return res.data;
    }

    async addCustomer(data) {
        await axios.post("http://localhost:3002/customers/addcustomer", data);
    }
    async updateCustomer(data) {
        await axios.put(
            `http://localhost:3002/customers/updatecustomer/${data.id}`,
            data
        );
    }
}

export default new CustomerService();
