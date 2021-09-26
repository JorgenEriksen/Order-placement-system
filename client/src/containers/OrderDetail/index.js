import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByIdFromAPI } from "../../utils/apiRequests";
import OrderForm from "../../components/OrderForm";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

  return (
    <div>
      <Button variant="contained" startIcon={<ArrowBackIcon />}>
        All orders
      </Button>
      {isLoading ? (
        <>
          <br />
          <br />
          <LinearProgress />
        </>
      ) : (
        <OrderForm />
      )}
    </div>
  );
};

export default OrderDetail;
