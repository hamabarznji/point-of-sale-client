import axios from "axios";

class UserService {
    async login(data) {
        const res = await axios.post("http://localhost:3002/user/login", data);
        return res.data;
    }

    async getUsers() {
        const res = await axios.get("http://localhost:3002/users");
        return res.data;
    }
    async addUser(data) {
        const res = await axios.post("http://localhost:3002/adduser", data);
        return res.data;
    }
    async updateUser(data) {
        const res = await axios.post(
            `http://localhost:3002/users/updateuser/${data.id}`,
            data
        );
        return res.data;
    }
}

export default new UserService();
