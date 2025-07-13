import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./components/common/topBar/TopBar";
import Home from "./components/Home";
import EmployeeForm from "./components/EmployeeForm";
import defaultData from "./components/mockapiData";

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ department: "", role: "" });
  const [currentPage, setCurrentPage] = useState(1); // for pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    const local = JSON.parse(localStorage.getItem("newEmployees")) || [];
    setEmployees([...defaultData, ...local]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase()); // convert to lowercase then search
    setCurrentPage(1); // bact to 1st page
  };

  const handleFilter = (filterData) => {
    setFilters(filterData);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const local = JSON.parse(localStorage.getItem("newEmployees")) || [];
    const updated = local.filter((emp) => emp.id !== id);
    localStorage.setItem("newEmployees", JSON.stringify(updated));
    loadEmployees();
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchQuery) ||
      emp.lastName.toLowerCase().includes(searchQuery) ||
      emp.email.toLowerCase().includes(searchQuery);

    const matchesDept = filters.department
      ? emp.department === filters.department
      : true;

    const matchesRole = filters.role ? emp.role === filters.role : true;

    return matchesSearch && matchesDept && matchesRole;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const paginatedEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <BrowserRouter>
      <TopBar onSearch={handleSearch} onFilter={handleFilter} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              employees={paginatedEmployees}
              onDelete={handleDelete}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          }
        />
        <Route path="/Add-Employee" element={<EmployeeForm />} />
        <Route path="/editEmployee/:id" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
