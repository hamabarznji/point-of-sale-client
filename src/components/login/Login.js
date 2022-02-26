import Grid from "@mui/material/Grid";

import loginImage from "../../assets/login.svg";
import LoginForm from "./loginForm";

export default function Loin() {
    return (
        <>
            <Grid container padding={2}>
                <Grid item lg={8} padding={20}>
                    <img src={loginImage} alt="login page" />
                </Grid>

                <Grid item lg={4} padding={10} marginTop={25}>
                    <LoginForm />
                </Grid>
            </Grid>
        </>
    );
}
