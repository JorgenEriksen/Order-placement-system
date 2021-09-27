let jobServices = [];

const getAllJobServicesFromAPI = async () => {
  if (jobServices.length > 0) {
    return jobServices;
  }
  const url = `${process.env.REACT_APP_APIURL}/JobService`;
  console.log(url);
  let response = await fetch(url);
  if (response.ok) {
    jobServices = await response.json();
    return jobServices;
  }
  return null;
};

const getOrderByIdFromAPI = async (id) => {
  const url = `${process.env.REACT_APP_APIURL}/Order/${id}`;
  console.log(url);
  let response = await fetch(url);
  if (response.ok) {
    let data = await response.json();
    return data;
  }
  return null;
};

const getAllOrdersFromAPI = async () => {
  const url = `${process.env.REACT_APP_APIURL}/Order`;
  console.log(url);
  let response = await fetch(url);
  if (response.ok) {
    let data = await response.json();
    return data;
  }
  return null;
};

const addOrderToAPI = async (orderData) => {
  const url = `${process.env.REACT_APP_APIURL}/Order`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (response.ok) {
    return "";
  }
  return "Error. Something went wrong when adding new order to API";
};

const editOrderToAPI = async (orderData, orderId) => {
  const url = `${process.env.REACT_APP_APIURL}/Order/${orderId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (response.ok) {
    return "";
  }
  return "Error. Something went wrong when editing order to API";
};

const deleteOrderToAPI = async (orderId) => {
  const url = `${process.env.REACT_APP_APIURL}/Order/${orderId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return "";
  }
  return "Error. Something went wrong when deleting order to API";
};

export {
  getAllJobServicesFromAPI,
  getOrderByIdFromAPI,
  getAllOrdersFromAPI,
  addOrderToAPI,
  editOrderToAPI,
  deleteOrderToAPI,
};
