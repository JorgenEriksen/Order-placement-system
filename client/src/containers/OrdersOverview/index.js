import React, { useEffect, useState } from "react";
import OrderList from "./components/OrderList";
import { getAllOrdersFromAPI } from "../../utils/apiRequests";

import LinearProgress from "@mui/material/LinearProgress";

const OrdersOverview = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrdersPlaceholder = await getAllOrdersFromAPI();
      setAllOrders(allOrdersPlaceholder);
      setIsLoading(false);
    };

    getAllOrders();
  }, []);

  return (
    <>
      <h1>All orders</h1>
      {isLoading ? (
        <LinearProgress style={{ marginTop: "10px" }} />
      ) : (
        <OrderList allOrders={allOrders} />
      )}
    </>
  );
};

export default OrdersOverview;
