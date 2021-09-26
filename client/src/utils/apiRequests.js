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

export { getOrderByIdFromAPI, getAllOrdersFromAPI };
