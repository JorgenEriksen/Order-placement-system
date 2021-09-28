import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderList from "./components/OrderList";
import { getAllOrdersFromAPI } from "../../utils/apiRequests";

import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import AddIcon from "@mui/icons-material/Add";

const OrdersOverview = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrdersPlaceholder = await getAllOrdersFromAPI();
      setOrders(allOrdersPlaceholder);
      setIsLoading(false);
    };

    getAllOrders();
  }, []);

  return (
    <>
      <h1>All orders</h1>
      <Button
        variant="contained"
        to={`/order/new`}
        component={Link}
        startIcon={<AddIcon />}
      >
        New Order
      </Button>
      {isLoading ? (
        <LinearProgress style={{ marginTop: "10px" }} />
      ) : (
        <OrderList orders={orders} />
      )}
    </>
  );
};

export default OrdersOverview;
