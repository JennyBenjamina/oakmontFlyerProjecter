import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function DateComponent({ onDateChange }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleMonthChange = (event) => {
    const monthIndex = Number(event.target.value);
    setSelectedMonth(months[monthIndex]);
    const newDate = new Date(selectedYear, monthIndex); // getMonth() is zero-based
    onDateChange(newDate);
    console.log("new date: ", newDate);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    const newDate = new Date(event.target.value, months.indexOf(selectedMonth)); // getMonth() is zero-based
    onDateChange(newDate);
    console.log("new date: ", newDate);
  };

  return (
    <div className="m-3">
      <Form.Select
        onChange={handleMonthChange}
        value={months.indexOf(selectedMonth)}
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </Form.Select>

      <Form.Select
        onChange={handleYearChange}
        value={selectedYear}
        className="mt-3"
      >
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default DateComponent;
