import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const EditItemForm = ({ item, onUpdate, onCancel }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedItem);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={editedItem.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={editedItem.quantity}
          onChange={handleChange}
          required
          min="0"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="price"
          value={editedItem.price}
          onChange={handleChange}
          required
          min="0"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Demand</Form.Label>
        <Form.Control
          type="number"
          name="demand"
          value={editedItem.demand}
          onChange={handleChange}
          required
          min="0"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ordering Cost</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="orderingCost"
          value={editedItem.orderingCost}
          onChange={handleChange}
          required
          min="0"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Holding Cost</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="holdingCost"
          value={editedItem.holdingCost}
          onChange={handleChange}
          required
          min="0"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Changes
      </Button>{" "}
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default EditItemForm;