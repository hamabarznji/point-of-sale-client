import axios from "axios";

class UserService {
    async login(data) {
        const res = await axios.post("http://localhost:3002/user/login", data);
        return res.data;
    }
}

export default new UserService();
