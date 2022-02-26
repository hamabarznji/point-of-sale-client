import Grid from "@mui/material/Grid";
import DashboardImage from "../../assets/dashboard.png";
export default function Dashboard() {
    return (
        <>
            <Grid contaner xs={12} justifyContent="center" alignItems="center">
                <Grid item xs={10} justifyContent="center" alignItems="center">
                    <img src={DashboardImage} alt="dashboard" />
                </Grid>
            </Grid>
        </>
    );
}
