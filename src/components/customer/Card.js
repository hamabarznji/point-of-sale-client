import { Card, Grid, CardHeader, Typography, CardContent } from "@mui/material";
import productIcon from "../../assets/product.png";
import Chip from "./Chip";
export default function CardComponent({ name, debt, address, phone, orders }) {
    return (
        <Card
            style={{
                maxWidth: "100%",
                maxHeight: "5%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <CardContent spacing={2}>
                <Chip
                    name={name}
                    address={address}
                    phone={phone}
                    debt={debt}
                    orders={orders}
                />
            </CardContent>
        </Card>
    );
}
