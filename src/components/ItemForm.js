import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";

const ItemForm = ({ onAddItem }) => {
  const [item, setItem] = useState({
    name: "",
    quantity: 0,
    price: 0,
    demand: 0,
    orderingCost: 0,
    holdingCost: 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!item.name) newErrors.name = "Name is required.";
    if (item.quantity < 0) newErrors.quantity = "Quantity cannot be negative.";
    if (item.price < 0) newErrors.price = "Price cannot be negative.";
    if (item.demand < 0) newErrors.demand = "Demand cannot be negative.";
    if (item.orderingCost < 0) newErrors.orderingCost = "Ordering cost cannot be negative.";
    if (item.holdingCost < 0) newErrors.holdingCost = "Holding cost cannot be negative.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await axios.post("http://localhost:8080/api/items", item);
      onAddItem(response.data); // Notify parent component
      setItem({
        name: "",
        quantity: 0,
        price: 0,
        demand: 0,
        orderingCost: 0,
        holdingCost: 0,
      });
      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          isInvalid={!!errors.quantity}
        />
        <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="price"
          value={item.price}
          onChange={handleChange}
          isInvalid={!!errors.price}
        />
        <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Demand</Form.Label>
        <Form.Control
          type="number"
          name="demand"
          value={item.demand}
          onChange={handleChange}
          isInvalid={!!errors.demand}
        />
        <Form.Control.Feedback type="invalid">{errors.demand}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ordering Cost</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="orderingCost"
          value={item.orderingCost}
          onChange={handleChange}
          isInvalid={!!errors.orderingCost}
        />
        <Form.Control.Feedback type="invalid">{errors.orderingCost}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Holding Cost</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="holdingCost"
          value={item.holdingCost}
          onChange={handleChange}
          isInvalid={!!errors.holdingCost}
        />
        <Form.Control.Feedback type="invalid">{errors.holdingCost}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Item
      </Button>
    </Form>
  );
};

export default ItemForm;