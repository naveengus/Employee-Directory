import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EmployeCard({ data, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editEmployee/${data.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      onDelete(data.id);
    }
  };

  if (!data) return null;
  const { firstName, lastName, email, department, role } = data;

  return (
    <div className="cardBody">
      <Card className="card">
        <Card.Body>
          <Card.Title>
            {firstName} {lastName}
          </Card.Title>
          <Card.Text>
            <h6>Email: {email}</h6>
            <h6>Department: {department}</h6>
            <h6>Role: {role}</h6>
          </Card.Text>
          <Button variant="primary" onClick={handleEdit} className="me-2">
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EmployeCard;
