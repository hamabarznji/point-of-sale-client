import { Card, Grid, CardHeader, Typography, CardContent } from "@mui/material";
import productIcon from "../../assets/product.png";

export default function CardComponent({ icon, content, title }) {
    return (
        <Card
            style={{
                maxWidth: "50%",
                maxHeight: "20%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <CardHeader
                title={title ? title : ""}
                style={{
                    marginLeft: "6.3rem",
                }}
            />
            <img
                src={icon ? icon : productIcon}
                alt="icon"
                style={{
                    height: "30%",
                    width: "30%",
                    marginLeft: "7rem",
                }}
            />
            <CardContent>
                <Typography
                    variant="h5"
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    {content ? content : 0}
                </Typography>
            </CardContent>
        </Card>
    );
}
