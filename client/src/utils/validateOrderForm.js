const validateOrderForm = (formData) => {
  if (formData.firstName.length < 1) {
    return "first name can not be empty";
  }
  if (formData.lastName.length < 1) {
    return "last name can not be empty";
  }
  if (formData.phone.toString().length < 8) {
    return "phone number needs to be atleast 8 digits";
  }
  if (isNumber(formData.phone)) {
    return "phone number is not valid";
  }
  if (!validateEmail(formData.email)) {
    return "email is not valid";
  }
  if (formData.fromStreet.length < 1) {
    return "former address street can not be empty";
  }
  if (formData.fromZipCode.length < 1) {
    return "former address zip code can not be empty";
  }
  if (isNumber(formData.fromZipCode)) {
    return "former address zip code is not valid";
  }
  if (formData.fromCity.length < 1) {
    return "former address city can not be empty";
  }
  if (formData.toStreet.length < 1) {
    return "new address street can not be empty";
  }
  if (formData.toZipCode.length < 1) {
    return "new address zip code can not be empty";
  }
  if (isNumber(formData.toZipCode)) {
    return "new address zip code is not valid";
  }
  if (formData.toCity.length < 1) {
    return "new address city can not be empty";
  }

  if (!formData.moving && !formData.packing && !formData.cleaning) {
    return "You need to chooce atleast one service";
  }

  return "";
};

const isNumber = (number) => {
  return !isNaN(parseFloat(number)) && isFinite(number) && number > 0;
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default validateOrderForm;
