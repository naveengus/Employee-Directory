import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";

function EmployeeForm() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (id) {
      //getting local storage data
      const localData = JSON.parse(localStorage.getItem("newEmployees")) || [];
      const employeeToEdit = localData.find((emp) => emp.id === parseInt(id));
      if (employeeToEdit) {
        setFormData(employeeToEdit);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const localData = JSON.parse(localStorage.getItem("newEmployees")) || [];

      if (id) {
        // Mean Edit page mode
        const updatedData = localData.map((emp) =>
          emp.id === parseInt(id) ? { ...emp, ...formData } : emp
        );
        localStorage.setItem("newEmployees", JSON.stringify(updatedData));
      } else {
        // Mean Add page mode
        const newEmployee = { id: Date.now(), ...formData };
        localStorage.setItem(
          "newEmployees",
          JSON.stringify([...localData, newEmployee])
        );
      }

      navigate("/");
    }

    setValidated(true);
  };

  return (
    <div className="Form align-items-center ">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Select
              required
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Select
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="Analyst">Analyst</option>
              <option value="Manager">Manager</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Button type="button" variant="secondary" onClick={() => navigate("/")}>
          Cancel
        </Button>{" "}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default EmployeeForm;
