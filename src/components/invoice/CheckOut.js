import { useNavigate, useLocation } from "react-router-dom";

export default function CheckOut() {
    const history = useNavigate();
    const location = useLocation();

    console.log(location);
    return (
        <>
            <h1>CheckOut</h1>
        </>
    );
}
