import React from "react";
import OrderForm from "../../components/OrderForm";
import { addOrderToAPI } from "../../utils/apiRequests";

const NewOrder = () => {
  const addOrder = async (formData) => {
    console.log("from addOrder");
    console.log(formData);
    const error = await addOrderToAPI(formData);
    return error;
  };

  return (
    <div>
      <h1>New order</h1>
      <OrderForm editMode={false} submitAction={addOrder} />
    </div>
  );
};

export default NewOrder;
