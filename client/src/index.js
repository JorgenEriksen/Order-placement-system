import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CardPage from "./components/CardPage";
import OrdersOverview from "./containers/OrdersOverview";
import OrderDetail from "./containers/OrderDetail";
import NewOrder from "./containers/NewOrder";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CardPage>
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
    </BrowserRouter>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
