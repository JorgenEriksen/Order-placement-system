import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderList from "./components/OrderList";
import {
  getAllJobServicesFromAPI,
  getAllOrdersFromAPI,
} from "../../utils/apiRequests";

import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

const OrdersOverview = () => {
  const [orders, setOrders] = useState([]);
  const [jobServices, setJobServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllOrders = async () => {
      const allJobServicesPlaceholder = await getAllJobServicesFromAPI();
      const allOrdersPlaceholder = await getAllOrdersFromAPI();
      setJobServices(allJobServicesPlaceholder);
      setOrders(allOrdersPlaceholder);
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
        <>
          <Button variant="contained" to={`/order/new`} component={Link}>
            New Order
          </Button>
          <OrderList orders={orders} />
        </>
      )}
    </>
  );
};

export default OrdersOverview;
