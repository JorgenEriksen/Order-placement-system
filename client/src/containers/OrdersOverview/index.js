import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import OrderList from "./components/OrderList";
import SearchFilterSort from "./components/SearchFilterSort";
import { getAllOrdersFromAPI } from "../../utils/apiRequests";
import { SnackbarContext } from "../../context/SnackbarContext";

import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import AddIcon from "@mui/icons-material/Add";

const OrdersOverview = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { snack, setSnack } = useContext(SnackbarContext);

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrdersPlaceholder = await getAllOrdersFromAPI();
      if (allOrdersPlaceholder != null) {
        setAllOrders(allOrdersPlaceholder);
        setIsLoading(false);
      } else {
        setSnack({
          open: true,
          message: "Can't get orders from API. Try again later",
          severity: "error",
        });
      }
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
        <>
          <SearchFilterSort
            allOrders={allOrders}
            orders={orders}
            setOrders={setOrders}
          />
          <OrderList orders={orders} />
        </>
      )}
    </>
  );
};

export default OrdersOverview;
