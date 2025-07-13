import { useState } from "react";
import { Button, Form, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TopBar({ onSearch, onFilter }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");

  const [filterDept, setFilterDept] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  const handleFilterChange = () => {
    onFilter({
      department: filterDept,
      role: filterRole,
    });
  };

  return (
    <div>
      <div className="topbar-container d-flex justify-content-between align-items-center p-3 ">
        <h2 className="mb-0 topHead">Employee Directory</h2>

        <div className="d-flex gap-3 topSearch">
          <input
            type="search"
            placeholder="Search by name or email"
            className="form-control"
            style={{ width: "300px" }}
            value={query}
            onChange={handleSearchChange}
          />
        </div>

        <div className="d-flex gap-2 align-items-center ">
          <Button
            variant="outline-secondary"
            onClick={handleShow}
            className=" filter "
          >
            Filter
          </Button>
        </div>

        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form>
              <Form.Group className="mb-3" controlId="filterDepartment">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Backend">Finance</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="filterRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Developer">Developer</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Manager">Manager</option>
                </Form.Select>
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => {
                  handleFilterChange();
                  handleClose();
                }}
              >
                Apply Filters
              </Button>
              <Button
                type="button"
                className="back"
                placement="end"
                variant="secondary"
                onClick={() => navigate("/")}
              >
                clear
              </Button>{" "}
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </div>
      <div className="addSec">
        <Button variant="success" onClick={() => navigate("/Add-Employee")}>
          Add Employee
        </Button>
        <Button
          type="button"
          className="back"
          placement="end"
          variant="secondary"
          onClick={() => {
            navigate("/");
            setTimeout(() => window.location.reload(), 100);
          }}
        >
          Back
        </Button>{" "}
      </div>
    </div>
  );
}

export default TopBar;
