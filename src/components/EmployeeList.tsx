// src/components/EmployeeList.tsx
import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Employee } from './Employee';

interface EmployeeListProps {
  employees: Employee[];
  onDeleteEmployee: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onDeleteEmployee }) => {
  const navigate = useNavigate();

  // Function to handle edit button click
  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleAddEmployee = () => {
    navigate(`/`); // Assuming the AddEmployee component is rendered on the root `/`
  };
  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={handleAddEmployee}>Add Employee</button> {/* Add Employee button */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Manager</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Date of Joining</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.manager}</td>
              <td>{employee.location}</td>
              <td>{employee.salary}</td>
              <td>{employee.dateOfJoining}</td>
              <td>
                {/* <Link to={`/edit/${employee.id}`}>Edit</Link> */}
                <button onClick={() => handleEdit(employee.id)}>Edit</button> {/* Edit button */}
                <button onClick={() => onDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
