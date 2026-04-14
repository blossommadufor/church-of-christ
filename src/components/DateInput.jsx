import React from "react";
import moment from "moment";

const DateInput = ({ className, ...props }) => {
  // Prevent users from picking dates in the future
  const maxDate = moment().format("YYYY-MM-DD");

  return (
    <input
      type="date"
      max={maxDate}
      className={className}
      {...props}
    />
  );
};

export default DateInput;
