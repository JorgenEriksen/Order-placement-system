import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getOrderByIdFromAPI,
  editOrderToAPI,
  deleteOrderToAPI,
} from "../../utils/apiRequests";
import OrderForm from "../../components/OrderForm";
import { SnackbarContext } from "../../context/SnackbarContext";

import LinearProgress from "@mui/material/LinearProgress";

const OrderDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState(true);
  const { snack, setSnack } = useContext(SnackbarContext);
  const params = useParams();
  let history = useHistory();

  useEffect(() => {
    const getOrderById = async () => {
      const orderDataPlaceholder = await getOrderByIdFromAPI(params.id);
      setOrderData(orderDataPlaceholder);
      setIsLoading(false);
    };
    getOrderById();
  }, [params.id]);

  const editOrder = async (formData) => {
    const error = await editOrderToAPI(formData, params.id);
    if (error === "") {
      setSnack({
        open: true,
        message: "Order is edited",
        severity: "success",
      });
      history.push("/");
    } else {
      setSnack({
        open: true,
        message: error,
        severity: "error",
      });
    }
  };

  const deleteOrder = async () => {
    const error = await deleteOrderToAPI(params.id);
    if (error === "") {
      setSnack({
        open: true,
        message: "Order is deleted",
        severity: "success",
      });
      history.push("/");
    } else {
      setSnack({
        open: true,
        message: error,
        severity: "error",
      });
    }
  };

  return (
    <div>
      <h1>Edit order</h1>

      {isLoading ? (
        <>
          <LinearProgress style={{ marginTop: "10px" }} />
        </>
      ) : (
        <>
          <OrderForm
            editMode={true}
            submitAction={editOrder}
            orderData={orderData}
            deleteOrder={deleteOrder}
          />
        </>
      )}
    </div>
  );
};

export default OrderDetail;
