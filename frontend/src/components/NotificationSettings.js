import React, { useState } from 'react';

const NotificationSettings = ({ onSetOffset }) => {
  const [offset, setOffset] = useState(20); // Default offset to 20 minutes

  const handleChange = (event) => {
    setOffset(event.target.value);
  };

  const handleSave = () => {
    onSetOffset(offset);
  };

  return (
    <div>
      <label htmlFor="offset">Set Offset for Notifications (minutes):</label>
      <input
        id="offset"
        type="number"
        value={offset}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save Offset</button>
    </div>
  );
};

export default NotificationSettings;
