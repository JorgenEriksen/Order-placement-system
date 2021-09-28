import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CardPage from "./components/CardPage";
import OrdersOverview from "./containers/OrdersOverview";
import OrderDetail from "./containers/OrderDetail";
import NewOrder from "./containers/NewOrder";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContext } from "./context/SnackbarContext";
import MuiAlert from "@mui/material/Alert";

const App = () => {
  const [snack, setSnack] = useState({
    message: "",
    color: "",
    open: false,
  });

  const closeSnackbar = () => {
    setSnack({
      message: "",
      severity: "",
      open: false,
    });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <SnackbarContext.Provider value={{ snack, setSnack }}>
          <CardPage>
            <Snackbar
              open={snack.open}
              autoHideDuration={6000}
              onClose={closeSnackbar}
            >
              <Alert
                onClose={closeSnackbar}
                severity={snack.severity}
                sx={{ width: "100%" }}
              >
                {snack.message}
              </Alert>
            </Snackbar>
            <Switch>
              <Route exact path="/">
                <OrdersOverview />
              </Route>
              <Route path="/order/new">
                <NewOrder />
              </Route>
              <Route path="/order/:id">
                <OrderDetail />
              </Route>
            </Switch>
          </CardPage>
        </SnackbarContext.Provider>
      </BrowserRouter>
      ,
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
