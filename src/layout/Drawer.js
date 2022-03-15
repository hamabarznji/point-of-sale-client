import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//icons
import StoreIcon from "@mui/icons-material/Store";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
// import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TransformIcon from "@mui/icons-material/Transform";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { Link } from "react-router-dom";

import Appbar from "./AppBar";

const drawerWidth = 240;

const DrawerItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon color="primary" />,
    },
    {
        name: "Warehouse",
        path: "/dashboard/products",
        icon: <WarehouseIcon color="primary" />,
    },
    {
        name: "Transfarred Product",
        path: "/dashboard/transfareedproducts",
        icon: <TransformIcon color="primary" />,
    },
    {
        name: "Store",
        path: "/dashboard/stores",
        icon: <StoreIcon color="primary" />,
    },
    {
        name: "Invoice",
        path: "/dashboard/invoices",
        icon: <ReceiptIcon color="primary" />,
    },
    {
        name: "Customer",
        path: "/dashboard/customers",
        icon: <PeopleOutlineIcon color="primary" />,
    },
    {
        name: "Employee",
        path: "/dashboard/employees",
        icon: <BadgeIcon color="primary" />,
    },
    {
        name: "User",
        path: "/dashboard/users",
        icon: <AccountCircleIcon color="primary" />,
    },
    {
        name: "Expense",
        path: "/dashboard/expenses",
        icon: <MoneyOffIcon color="primary" />,
    },

    {
        name: "Report",
        path: "/dashboard/report",
        icon: <AssessmentIcon color="primary" />,
    },
];

export default function DrawerComponent() {
    return (
        <Box>
            <CssBaseline />
            j
            <Appbar />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List style={{ background: "#2E3B55", height: "100%" }}>
                    {DrawerItems.map((item, index) => (
                        <Link
                            to={item.path}
                            key={index}
                            size="medium"
                            color="secondary"
                            style={{
                                margin: "1rem",
                                textDecoration: "none",
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            <ListItem
                                button
                                key={item.name}
                                style={{ top: "9%" }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            ></Box>
        </Box>
    );
}
