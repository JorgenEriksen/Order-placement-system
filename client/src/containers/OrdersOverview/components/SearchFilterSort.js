import React, { useEffect, useState } from "react";
import {
  compare,
  compareReverse,
  filterOrders,
} from "../../../utils/sortAndFilter";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import "./SearchFilterSort.css";

const SearchFilterSort = ({ allOrders, orders, setOrders }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("serviceDate");

  const sortProperties = [
    { prop: "firstName", displayName: "Firstname" },
    { prop: "lastName", displayName: "Lastname" },
    { prop: "serviceDate", displayName: "Service date" },
  ];

  useEffect(() => {
    let newOrderList = [...allOrders];
    if (sort === "serviceDate") {
      newOrderList.sort((a, b) => compareReverse(a, b, sort));
    } else {
      newOrderList.sort((a, b) => compare(a, b, sort));
    }

    newOrderList = filterOrders(newOrderList, search);

    console.log(newOrderList);
    setOrders(newOrderList);
  }, [allOrders, search, sort]);

  return (
    <div className="searchfiltersort-container">
      <div id="search-container">
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="search"
          className="search-mui"
          label="Search"
          variant="outlined"
        />
      </div>
      <div>
        <div>
          <FormControl>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={sort}
              label="Sort by"
              onChange={(e) => setSort(e.target.value)}
            >
              {sortProperties.map((sortItem) => {
                return (
                  <MenuItem value={sortItem.prop}>
                    {sortItem.displayName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

SearchFilterSort.propTypes = {
  allOrders: PropTypes.array,
  orders: PropTypes.array,
  setOrders: PropTypes.func,
};

export default SearchFilterSort;
