import Table from "../ReactTabel";
import EmployeeService from "../../services/EmployeeService";
import React from "react";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import StoreService from "../../services/StoreService";
import { useSelector } from "react-redux";
const columns = [
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "salary", label: "Salary", minWidth: 170, align: "center" },
    { id: "address", label: "Address", minWidth: 170, align: "center" },
    { id: "phone", label: "Phone", minWidth: 170, align: "center" },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];

export default function Employee() {
    const [employees, setEmployees] = React.useState([]);
    const [stores, setStores] = React.useState([]);
    const userRole = useSelector((state) => state.posRedux.userRole);
    console.log(userRole);
    React.useEffect(() => {
        getAll();
        getStores();
    }, []);

    const getAll = async () => {
        try {
            const data = await EmployeeService.getEmployees();
            setEmployees(data);
            return Promise.resolve("done");
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const getStores = async () => {
        try {
            const data = await StoreService.getStores();
            setStores(data);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const rows = employees.map((employee, index) => {
        return {
            key: { index },
            id: employee.id,
            name: employee.name,
            salary: employee.salary,
            address: employee.address,
            phone: employee.phone,
            action: (
                <UpdateEmployee
                    employee={employee}
                    items={stores}
                    getAll={getAll}
                />
            ),
        };
    });
    return (
        <>
            {userRole === "accountant" && (
                <AddEmployee getAll={getAll} items={stores} />
            )}
            <Table columns={columns} rows={rows} />
        </>
    );
}
