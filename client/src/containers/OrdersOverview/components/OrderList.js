import React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const OrderList = ({ orders }) => {
  return (
    <List>
      {orders.map((order, index) => {
        console.log(order);
        return (
          <ListItemButton
            to={`/order/${order.id}`}
            component={Link}
            key={index}
            secondaryAction={
              <IconButton>
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${order.firstName} ${order.lastName} - ${order.serviceDate}`}
              secondary={`placeholder`}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array,
};

export default OrderList;
