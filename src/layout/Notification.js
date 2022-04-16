import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import NotificationsIcon from "@mui/icons-material/Notifications";
import ProductService from "../services/ProductService";
import TransfareedProductService from "../services/TransfareedProductService";
import { Badge } from "@mui/material";
export default function Notification() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const userRole = localStorage.getItem("userRole");

    const [notifications, setNotifications] = React.useState([]);
    const [badgeContent, setBadgeContent] = React.useState(0);
    const getNotifications = async () => {
        if (userRole === "accountant") {
            try {
                const res =
                    await TransfareedProductService.getTransfareedProductsNotifications();
                setNotifications(res.data);
                setBadgeContent(res.badgeContent);
                return Promise.resolve(res);
            } catch (err) {
                return Promise.reject(err);
            }
        } else if (userRole === "warehouse") {
            try {
                const res = await ProductService.getProductsNotifications();
                setNotifications(res.data);
                setBadgeContent(res.badgeContent);
                return Promise.resolve(res);
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            try {
                const product = await ProductService.getProductsNotifications();
                const transfaree =
                    await TransfareedProductService.getTransfareedProductsNotifications();
                const notis = product.data.concat(transfaree.data);
                setNotifications(notis);
                setBadgeContent(product.badgeContent + transfaree.badgeContent);
                return Promise.resolve(notifications);
            } catch (err) {
                return Promise.reject(err);
            }
        }
    };

    React.useEffect(() => {
        getNotifications();
    }, []);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(notifications);
    return (
        <React.Fragment>
            <Badge badgeContent={badgeContent} color="error">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Tooltip title="Notifications">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <NotificationsIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    {notifications.map((product) => {
                        return (
                            <MenuItem
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                <ListItemIcon style={{ color: "#C40B00" }}>
                                    {product.qty !== 0
                                        ? product.qty
                                        : product.weight}
                                </ListItemIcon>
                                {product.name}-
                                <span style={{ color: "green" }}>
                                    {" "}
                                    {product.place}
                                </span>
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Badge>
        </React.Fragment>
    );
}
