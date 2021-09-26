import React, { useState } from "react";
import validateOrderForm from "../../utils/validateOrderForm";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

import TextField from "@mui/material/TextField";
import "./index.css";

const OrderForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [fromStreet, setFromStreet] = useState("");
  const [fromZipCode, setFromZipCode] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toStreet, setToStreet] = useState("");
  const [toZipCode, setToZipCode] = useState("");
  const [toCity, setToCity] = useState("");
  const [moving, setMoving] = useState(false);
  const [packing, setPacking] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formSubmit = () => {
    const formData = {
      firstName,
      lastName,
      phone,
      email,
      date,
      fromStreet,
      fromZipCode,
      fromCity,
      toStreet,
      toZipCode,
      toCity,
      moving,
      packing,
      cleaning,
      orderNote,
    };

    let errorMessage = validateOrderForm(formData);
    if (errorMessage === "") {
    } else {
      setErrorMessage(errorMessage);
    }
    console.log(errorMessage);
  };
  return (
    <form className="order-form-container">
      <FormLabel className="order-form-title" component="legend">
        Customer information
      </FormLabel>
      <div className="order-form-section">
        <div className="order-form-item">
          <TextField
            className="width100"
            label="First name"
            id="Firstname"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="order-form-item">
          <TextField
            className="width100"
            id="Lastname"
            label="Last name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="order-form-section">
        <div className="order-form-item">
          <TextField
            className="width100"
            id="Phone"
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="order-form-item">
          <TextField
            className="width100"
            id="Email"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="order-form-section">
        <div className="order-form-item">
          <TextField
            className="width100"
            label="Date of service"
            id="Date"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <FormLabel className="order-form-title" component="legend">
        Former address
      </FormLabel>
      <div className="order-form-section">
        <div className="order-form-item">
          <TextField
            className="width100"
            id="from-street"
            label="Street"
            variant="outlined"
            value={fromStreet}
            onChange={(e) => setFromStreet(e.target.value)}
          />
        </div>
        <div className="order-form-item-zip">
          <TextField
            className="width100"
            id="from-zip-code"
            label="Zip code"
            variant="outlined"
            value={fromZipCode}
            onChange={(e) => setFromZipCode(e.target.value)}
          />
        </div>
        <div className="order-form-item">
          <TextField
            className="width100"
            id="from-city"
            label="City"
            variant="outlined"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
          />
        </div>
      </div>

      <FormLabel className="order-form-title" component="legend">
        New address
      </FormLabel>
      <div className="order-form-section">
        <div className="order-form-item">
          <TextField
            className="width100"
            id="to-street"
            label="Street"
            variant="outlined"
            value={toStreet}
            onChange={(e) => setToStreet(e.target.value)}
          />
        </div>
        <div className="order-form-item-zip">
          <TextField
            className="width100"
            id="to-zip-code"
            label="Zip code"
            variant="outlined"
            value={toZipCode}
            onChange={(e) => setToZipCode(e.target.value)}
          />
        </div>
        <div className="order-form-item">
          <TextField
            className="width100"
            id="to-city"
            label="City"
            variant="outlined"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
          />
        </div>
      </div>

      <div className="order-form-section">
        <div className="order-form-item">
          <FormLabel className="order-form-title" component="legend">
            Services
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              value={moving}
              onChange={(e) => setMoving(e.target.checked)}
              control={<Checkbox />}
              label="Moving"
            />
            <FormControlLabel
              value={packing}
              onChange={(e) => setPacking(e.target.checked)}
              control={<Checkbox />}
              label="Packing"
            />
            <FormControlLabel
              value={cleaning}
              onChange={(e) => setCleaning(e.target.checked)}
              control={<Checkbox />}
              label="Cleaning"
            />
          </FormGroup>
        </div>
      </div>

      <div className="order-form-section">
        <div className="order-form-item">
          <TextField
            className="width100"
            id="note"
            multiline
            rows={4}
            label="Order note"
            variant="outlined"
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
          />
        </div>
      </div>

      {errorMessage.length > 0 && (
        <Alert
          severity="error"
          className="order-form-alert"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setErrorMessage("");
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errorMessage}
        </Alert>
      )}

      <div className="order-form-button-container">
        <Button variant="contained" onClick={formSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
