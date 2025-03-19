import React from 'react';

const TimezoneSelector = ({ onTimezoneChange }) => {
  const handleChange = (event) => {
    onTimezoneChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="timezone">Select Time Zone:</label>
      <select id="timezone" onChange={handleChange}>
        <option value="toronto">Toronto</option>
        <option value="dhaka">Dhaka</option>
      </select>
    </div>
  );
};

export default TimezoneSelector;
