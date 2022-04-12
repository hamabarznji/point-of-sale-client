import axios from "axios";

class DashboardService {
    async getDashboard() {
        const res = await axios.get(
            `http://localhost:3002/dashboard/stores/${localStorage.getItem(
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
}

export default new DashboardService();
