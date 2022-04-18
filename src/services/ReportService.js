import axios from "axios";

class ReportService {
    async getReport(path) {
        const res = await axios.get(`http://localhost:3002/${path}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        return res.data;
    }
}

export default new ReportService();
