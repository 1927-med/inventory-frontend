import React from "react";
import { Table, Button } from "react-bootstrap";
import EditItemForm from "./EditItemForm"; // I'll create this next


const ItemList = ({ items, onDelete }) => {
    const [editingItemId, setEditingItemId] = useState(null);

    const handleEditClick = (id) => {
      setEditingItemId(id);
    };
  
    const handleCancelEdit = () => {
      setEditingItemId(null);
    };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Demand</th>
          <th>Ordering Cost</th>
          <th>Holding Cost</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
             {editingItemId === item.id ? (
              <td colSpan="8">
                <EditItemForm
                  item={item}
                  onUpdate={onUpdate}
                  onCancel={handleCancelEdit}
                />
              </td>
            ) : (
              <>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.demand}</td>
            <td>{item.orderingCost}</td>
            <td>{item.holdingCost}</td>
            <td>
              <Button variant="danger" onClick={() => onDelete(item.id)}>
                Delete
              </Button>
            </td>
            </>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ItemList;