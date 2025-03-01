import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [items, setItems] = useState([]);

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // Add a new item
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <Container className="mt-5">
      <h1>Inventory Management System</h1>
      <ItemForm onAddItem={handleAddItem} />
      <h2 className="mt-5">Inventory Items</h2>
      <ItemList items={items} />
    </Container>
  );
};

export default App;