import axios from "axios";

class UserService {
    async login(data) {
        const res = await axios.post("http://localhost:3002/login", data);
        console.log(res, "res");
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
    async addUser(data) {
        const res = await axios.post("http://localhost:3002/users", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }
    async updateUser(data) {
        const res = await axios.post(
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
