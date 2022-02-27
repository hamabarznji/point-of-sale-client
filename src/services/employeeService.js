import axios from "axios";

class EmployeeService {
    async getEmployees() {
        const res = await axios.get("http://localhost:3002/employees");
        return res.data;
    }
    async getEmployee(id) {
        const res = await axios.get(`http://localhost:3002/employees/${id}`);
        return res.data;
    }

    async addEmployee(data) {
        await axios.post("http://localhost:3002/employees/addemployee", data);
    }
    async updateEmployee(data) {
        await axios.put(
            `http://localhost:3002/employees/updateemployee/${data.id}`,
            data
        );
    }
}

export default new EmployeeService();
