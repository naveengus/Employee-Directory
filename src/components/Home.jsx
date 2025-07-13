import React from "react";
import EmployeCard from "./EmployeCard";
import { Button, Form } from "react-bootstrap";
import Footer from "./Footer";

function Home({
  employees,
  onDelete,
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-3 vh-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Select
          style={{ width: "150px" }}
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // back to first page
          }}
        >
          <option value={3}>Show 3</option>
          <option value={6}>Show 6</option>
          <option value={50}>Show 50</option>
          <option value={100}>Show 100</option>
        </Form.Select>

        <div>
          <Button
            variant="outline-primary"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </Button>{" "}
          <span>
            Page {currentPage} of {totalPages}
          </span>{" "}
          <Button
            variant="outline-primary"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="employeeCard">
        {employees.map((emp) => (
          <EmployeCard key={emp.id} data={emp} onDelete={onDelete} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
