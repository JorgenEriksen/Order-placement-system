export const compare = (a, b, nameOfObject) => {
  // for sorting.
  if (a[nameOfObject] < b[nameOfObject]) {
    return -1;
  }
  if (a[nameOfObject] > b[nameOfObject]) {
    return 1;
  }
  return 0;
};

export const compareReverse = (a, b, nameOfObject) => {
  // for sorting.
  if (a[nameOfObject] < b[nameOfObject]) {
    return 1;
  }
  if (a[nameOfObject] > b[nameOfObject]) {
    return -1;
  }
  return 0;
};

export const filterOrders = (orderList, search) => {
  const searchTerm = lowerCase(search);
  const newOrderList = orderList.filter(
    (order) =>
      lowerCase(order.firstName).includes(searchTerm) ||
      lowerCase(order.lastName).includes(searchTerm)
  );
  return newOrderList;
};

export const lowerCase = (str) => {
  if (!str) {
    return "";
  }
  return str.trim().toLowerCase();
};
