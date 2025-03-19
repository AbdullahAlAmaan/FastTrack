import React from 'react';

const TimingDisplay = ({ timings }) => {
  // Conditional rendering: Display fallback if timings are not available
  return (
    <div>
      <h3>Sehri Time: {timings?.sehri || 'Not available'}</h3>
      <h3>Iftar Time: {timings?.iftar || 'Not available'}</h3>
    </div>
  );
};

export default TimingDisplay;
