import React, { useState, useEffect } from "react";
import ConfirmDialog from "../ConfirmDialog.js";
import validateOrderForm from "../../utils/validateOrderForm";
import { Link, useHistory } from "react-router-dom";
import { getAllJobServicesFromAPI } from "../../utils/apiRequests";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import "./index.css";

const OrderForm = ({ editMode, submitAction, orderData, deleteOrder }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [fromStreet, setFromStreet] = useState("");
  const [fromZipCode, setFromZipCode] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toStreet, setToStreet] = useState("");
  const [toZipCode, setToZipCode] = useState("");
  const [toCity, setToCity] = useState("");
  const [jobServicesInput, setJobServicesInput] = useState([]);
  const [orderNote, setOrderNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const getAllJobServicesAndPopulate = async () => {
      let jobServicesPlaceholder = await getAllJobServicesFromAPI();
      if (jobServicesPlaceholder) {
        jobServicesPlaceholder = jobServicesPlaceholder.map((e) => {
          e.checked = orderData && orderData.jobServices.includes(e.id);
          return e;
        });
        setJobServicesInput(jobServicesPlaceholder);
      } else {
        setErrorMessage("Error getting job services from API");
      }
    };

    if (editMode) {
      populateForm();
    }
    getAllJobServicesAndPopulate();
  }, []);

  const populateForm = () => {
    setFirstName(orderData.firstName);
    setLastName(orderData.lastName);
    setPhone(orderData.phone);
    setEmail(orderData.email);
    setServiceDate(orderData.serviceDate);
    setFromStreet(orderData.fromStreet);
    setFromZipCode(orderData.fromZipCode);
    setFromCity(orderData.fromCity);
    setToStreet(orderData.toStreet);
    setToZipCode(orderData.toZipCode);
    setToCity(orderData.toCity);
    setOrderNote(orderData.orderNote);
  };

  const checkChange = (e, index) => {
    let jobServicesPlaceholder = [...jobServicesInput];
    jobServicesPlaceholder[index].checked = e.target.checked;
    setJobServicesInput(jobServicesPlaceholder);
  };

  const formSubmit = async () => {
    let jobServices = [];
    jobServicesInput.forEach((singleJobService) => {
      if (singleJobService.checked) {
        jobServices.push(singleJobService.id);
      }
    });

    const formData = {
      firstName,
      lastName,
      phone,
      email,
      serviceDate,
      fromStreet,
      fromZipCode,
      fromCity,
      toStreet,
      toZipCode,
      toCity,
      jobServices,
      orderNote,
    };

    let errorMessage = validateOrderForm(formData);
    if (errorMessage !== "") {
      setErrorMessage(errorMessage);
    } else {
      await submitAction(formData);
    }
  };
  return (
    <>
      <div className="top-buttons-container">
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          All orders
        </Button>
        {editMode && (
          <Button
            onClick={() => setOpenConfirmDialog(true)}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete Order
          </Button>
        )}
      </div>
      <form className="form-container">
        <FormLabel className="form-title" component="legend">
          Customer information
        </FormLabel>
        <div className="form-section">
          <div className="form-item">
            <TextField
              className="width100"
              label="First name"
              id="Firstname"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-item">
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

        <div className="form-section">
          <div className="form-item">
            <TextField
              className="width100"
              id="Phone"
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-item">
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

        <div className="form-section">
          <div className="form-item">
            <TextField
              className="width100"
              label="Date of service"
              id="Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={serviceDate}
              onChange={(e) => {
                console.log(e.target.value);
                setServiceDate(e.target.value);
              }}
            />
          </div>
        </div>

        <FormLabel className="form-title" component="legend">
          Former address
        </FormLabel>
        <div className="form-section">
          <div className="form-item">
            <TextField
              className="width100"
              id="from-street"
              label="Street"
              variant="outlined"
              value={fromStreet}
              onChange={(e) => setFromStreet(e.target.value)}
            />
          </div>

          <div className="form-zipandcity">
            <div className="form-zip-container">
              <TextField
                className="width100"
                id="from-zip-code"
                label="Zip code"
                variant="outlined"
                value={fromZipCode}
                onChange={(e) => setFromZipCode(e.target.value)}
              />
            </div>
            <div className="form-city-container width100">
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
        </div>

        <FormLabel className="form-title" component="legend">
          New address
        </FormLabel>
        <div className="form-section">
          <div className="form-item">
            <TextField
              className="width100"
              id="to-street"
              label="Street"
              variant="outlined"
              value={toStreet}
              onChange={(e) => setToStreet(e.target.value)}
            />
          </div>

          <div className="form-zipandcity">
            <div className="form-zip-container">
              <TextField
                className="width100"
                id="to-zip-code"
                label="Zip code"
                variant="outlined"
                value={toZipCode}
                onChange={(e) => setToZipCode(e.target.value)}
              />
            </div>
            <div className="form-city-container width100">
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
        </div>

        <div className="form-section">
          <div className="form-item">
            <FormLabel className="form-title" component="legend">
              Services
            </FormLabel>
            <FormGroup>
              {jobServicesInput.map((singleJobService, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    checked={singleJobService.checked}
                    onChange={(e) => checkChange(e, index)}
                    control={<Checkbox />}
                    label={singleJobService.serviceName}
                  />
                );
              })}
            </FormGroup>
          </div>
        </div>

        <div className="form-section">
          <div className="form-item">
            <TextField
              className="width100"
              id="note"
              multiline
              minRows={4}
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
            className="form-alert"
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

        <div className="form-button-container">
          <Button variant="contained" onClick={formSubmit}>
            {editMode ? "Edit order" : "Create order"}
          </Button>
        </div>
      </form>
      <ConfirmDialog
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        confirmFunction={deleteOrder}
        dialogTitle="Delete Order"
        dialogText="Are you sure you want to delete this order?"
      />
    </>
  );
};

OrderForm.propTypes = {
  editMode: PropTypes.bool,
  submitAction: PropTypes.func,
  orderData: PropTypes.array,
  deleteOrder: PropTypes.func,
};

export default OrderForm;
