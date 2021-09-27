import React, { useState, useEffect } from "react";
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
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import "./index.css";

const OrderForm = ({ submitAction }) => {
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
  const [orderNote, setOrderNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jobServicesInput, setJobServicesInput] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getAllJobServices = async () => {
      let jobServicesPlaceholder = await getAllJobServicesFromAPI();
      if (jobServicesPlaceholder) {
        jobServicesPlaceholder = jobServicesPlaceholder.map((e) => {
          e.checked = false;
          return e;
        });
        setJobServicesInput(jobServicesPlaceholder);
      } else {
        setErrorMessage("Error getting job services from API");
      }
    };

    getAllJobServices();
  }, []);

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
      date,
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
      console.log(formData);
      errorMessage = await submitAction(formData);
      if (errorMessage !== "") {
        setErrorMessage("");
      } else {
        history.push("/");
      }
    }
  };
  return (
    <>
      <Button
        component={Link}
        to=""
        variant="contained"
        startIcon={<ArrowBackIcon />}
      >
        All orders
      </Button>
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

OrderForm.propTypes = {
  submitAction: PropTypes.func,
};

export default OrderForm;
