import React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const OrderList = ({ allOrders }) => {
  const itemClick = () => {};
  return (
    <List>
      {allOrders.map((order, index) => {
        console.log(order);
        return (
          <ListItemButton
            to="/order/1"
            component={Link}
            key={index}
            onClick={() => {}}
            secondaryAction={
              <IconButton>
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${order.firstname} ${order.lastname} - ${order.serviceDate}`}
              secondary={`placeholder`}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
};

OrderList.propTypes = {
  children: PropTypes.array,
};

export default OrderList;
