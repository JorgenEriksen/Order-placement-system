import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const CardPage = ({ children }) => {
  return (
    <div className="card-page-container">
      <div className="card-container">{children}</div>
    </div>
  );
};

CardPage.propTypes = {
  children: PropTypes.element,
};

export default CardPage;
