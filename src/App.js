import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/items/${id}`);
      setItems(items.filter((item) => item.id !== id)); // Remove the deleted item from the list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Add a new item
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

   // Update an item
   const handleUpdateItem = async (updatedItem) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/items/${updatedItem.id}`,
        updatedItem
      );
      setItems(
        items.map((item) => (item.id === updatedItem.id ? response.data : item))
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading inventory items...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1>Inventory Management System</h1>
      <ItemForm onAddItem={handleAddItem} />
      <h2 className="mt-5">Inventory Items</h2>
      <ItemList items={items} onDelete={handleDelete} />
    </Container>
  );
};

export default App;