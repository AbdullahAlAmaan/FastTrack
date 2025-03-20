import React, { useState } from 'react';

const NotificationSettings = ({ onSetOffset }) => {
  const [offset, setOffset] = useState(20); // Default offset to 20 minutes

  const handleChange = (event) => {
    setOffset(event.target.value);
  };

  const handleSave = () => {
    onSetOffset(offset);  // Pass the offset to the parent component
    alert('Time Saved! Alarm will go off at the set offset.'); // Show alert
  };

  return (
    <div>
      <label htmlFor="offset">Set time</label>
      <input
        id="offset"
        type="number"
        value={offset}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save Time</button>
    </div>
  );
};

export default NotificationSettings;
