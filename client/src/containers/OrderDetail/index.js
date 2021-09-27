import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderByIdFromAPI } from "../../utils/apiRequests";
import OrderForm from "../../components/OrderForm";

import LinearProgress from "@mui/material/LinearProgress";

const OrderDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const getOrderById = async () => {
      const orderData = await getOrderByIdFromAPI(params.id);
      setIsLoading(false);
      console.log(orderData);
    };
    getOrderById();
  }, [params.id]);

  const editOrder = () => {
    console.log("from editOrder");
  };

  return (
    <div>
      <h1>Edit order</h1>

      {isLoading ? (
        <>
          <LinearProgress style={{ marginTop: "10px" }} />
        </>
      ) : (
        <OrderForm submitAction={editOrder} />
      )}
    </div>
  );
};

export default OrderDetail;
