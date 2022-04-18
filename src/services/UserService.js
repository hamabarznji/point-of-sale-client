import axios from "axios";

class UserService {
    async login(data) {
        const res = await axios.post("http://localhost:3002/login", data);
        return res.data;
    }

    async getUsers() {
        const res = await axios.get("http://localhost:3002/users", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }

    async auth() {
        const res = axios.get(`http://localhost:3002/login/auth`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }

    async addUser(data) {
        const res = await axios.post("http://localhost:3002/users", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }
    async deleteUser(id) {
        const res = await axios.delete(`http://localhost:3002/users/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }

    async updateUser(data) {
        const res = await axios.put(
            `http://localhost:3002/users/${data.id}`,
            data,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            }
        );
        return res.data;
    }
}

export default new UserService();
