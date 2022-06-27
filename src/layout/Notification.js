import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { Badge } from "@mui/material";
export default function Notification() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const badgeContent = useSelector((state) => state.posRedux.badgeContent);
    const notifications = useSelector((state) => state.posRedux.notifications);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                    {notifications.map((product, index) => {
                        return (
                            <MenuItem
                                key={index}
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
                                    {product.storeName}
                                </span>
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Badge>
        </React.Fragment>
    );
}
