import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderByIdFromAPI, editOrderToAPI } from "../../utils/apiRequests";
import OrderForm from "../../components/OrderForm";

import LinearProgress from "@mui/material/LinearProgress";

const OrderDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState(true);
  const params = useParams();

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

  return (
    <div>
      <h1>Edit order</h1>

      {isLoading ? (
        <>
          <LinearProgress style={{ marginTop: "10px" }} />
        </>
      ) : (
        <OrderForm
          editMode={true}
          submitAction={editOrder}
          orderData={orderData}
        />
      )}
    </div>
  );
};

export default OrderDetail;
