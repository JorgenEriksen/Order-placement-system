import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import OrderForm from "../../components/OrderForm";
import { addOrderToAPI } from "../../utils/apiRequests";
import { SnackbarContext } from "../../context/SnackbarContext";

const NewOrder = () => {
  const { snack, setSnack } = useContext(SnackbarContext);
  let history = useHistory();

  const addOrder = async (formData) => {
    console.log("from addOrder");
    console.log(formData);
    const error = await addOrderToAPI(formData);
    if (error == "") {
      setSnack({
        open: true,
        message: "Order created",
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
      <h1>New order</h1>
      <OrderForm editMode={false} submitAction={addOrder} />
    </div>
  );
};

export default NewOrder;
