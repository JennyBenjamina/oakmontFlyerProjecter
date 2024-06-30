import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EndDate({ onEndDateChange }) {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
    onEndDateChange(date);
  };

  return (
    <div className="form-group">
      <label>Remove By: </label>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        className="form-control m-3"
      />
    </div>
  );
}

export default EndDate;
