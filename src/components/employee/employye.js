import Table from "../reactTabel";
import EmployeeService from "../../services/employeeService";
import React from "react";
import AddEmployee from "./addEmployee";
import UpdateEmployee from "./updateEmployee";
const columns = [
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "salary", label: "Salary", minWidth: 170, align: "center" },
    { id: "address", label: "Address", minWidth: 170, align: "center" },
    { id: "phone", label: "Phone", minWidth: 170, align: "center" },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];

export default function Employee() {
    const [employees, setEmployees] = React.useState([]);

    const rows = employees.map((employee, index) => {
        return {
            key: { index },
            id: employee.id,
            name: employee.name,
            salary: employee.salary,
            address: employee.address,
            phone: employee.phone,
            action: <UpdateEmployee employee={employee} />,
        };
    });

    React.useEffect(() => {
        getAll();
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

    return (
        <>
            <AddEmployee getAll={getAll} />
            <Table columns={columns} rows={rows} />
        </>
    );
}
