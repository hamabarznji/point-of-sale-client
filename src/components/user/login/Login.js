import Grid from "@mui/material/Grid";

import loginImage from "../../../assets/login.svg";
import LoginForm from "./LoginForm";

export default function Loin() {
    return (
        <>
            <Grid container padding={2}>
                <Grid item lg={8} padding={18}>
                    <img src={loginImage} alt="login page" />
                </Grid>

                <Grid item lg={4} marginTop={35}>
                    <LoginForm />
                </Grid>
            </Grid>
        </>
    );
}
