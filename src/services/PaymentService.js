import axios from "axios";

class PaymentService {
    async addPayment(data) {
        const res = await axios.post("http://localhost:3002/payments", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        console.log("res", res.data);
        return res.data;
    }
}

export default new PaymentService();
