// src/components/EmployeeList.tsx
import React, { useState } from 'react';

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

  const [locationFilter, setLocationFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Handle filtering by location
  const handleLocationFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationFilter(e.target.value);
  };

  // Handle filtering by date
  const handleDateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
  };

  // Handle sorting by name
  const handleSortByName = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Apply filters and sorting
  const filteredAndSortedEmployees = employees
    .filter((employee) => {
      const matchesLocation = employee.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesDate = dateFilter === '' || employee.dateOfJoining === dateFilter;
      return matchesLocation && matchesDate;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    
  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={handleAddEmployee}>Add Employee</button> {/* Add Employee button */}
            
      {/* Filter section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by Location"
          value={locationFilter}
          onChange={handleLocationFilter}
        />
        <input
          type="date"
          placeholder="Filter by Date"
          value={dateFilter}
          onChange={handleDateFilter}
        />
        <button onClick={handleSortByName}>
          Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>
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
          {filteredAndSortedEmployees.map((employee) => (
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
