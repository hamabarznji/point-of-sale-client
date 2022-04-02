import axios from "axios";

class EmployeeService {
    async getEmployees() {
        const res = await axios.get(
            `http://localhost:3002/employees/stores/${localStorage.getItem(
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
    async getEmployee(id) {
        const res = await axios.get(`http://localhost:3002/employees/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }

    async addEmployee(data) {
        await axios.post("http://localhost:3002/employees", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
    async updateEmployee(data) {
        await axios.put(`http://localhost:3002/employees/${data.id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
    }
}

export default new EmployeeService();
