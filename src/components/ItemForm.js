import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const ItemForm = ({ onAddItem }) => {
  const [item, setItem] = useState({
    name: "",
    quantity: 0,
    price: 0,
    demand: 0,
    orderingCost: 0,
    holdingCost: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={item.quantity}
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
          value={item.price}
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
          value={item.demand}
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
          value={item.orderingCost}
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
          value={item.holdingCost}
          onChange={handleChange}
          required
          min="0"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Item
      </Button>
    </Form>
  );
};

export default ItemForm;