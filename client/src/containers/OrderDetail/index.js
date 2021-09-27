import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  getOrderByIdFromAPI,
  editOrderToAPI,
  deleteOrderToAPI,
} from "../../utils/apiRequests";
import OrderForm from "../../components/OrderForm";

import LinearProgress from "@mui/material/LinearProgress";

const OrderDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState(true);
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
    console.log("from editOrder");
    const error = await editOrderToAPI(formData, params.id);
    return error;
  };

  const deleteOrder = async () => {
    const error = await deleteOrderToAPI(params.id);
    history.push("/");
    console.log("delete");
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
