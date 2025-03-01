import React from "react";
import { Table } from "react-bootstrap";

const ItemList = ({ items }) => {
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
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.demand}</td>
            <td>{item.orderingCost}</td>
            <td>{item.holdingCost}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ItemList;