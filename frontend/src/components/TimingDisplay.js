import React from 'react';

const TimingDisplay = ({ timings }) => {
  // Check if timings are available before rendering
  if (!timings || !timings.dates || !timings.sehri) {
    return <div>Loading timings...</div>; // Show loading message if timings are not yet available
  }

  return (
    <div>
      <h3>Sehri Times</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sehri Time</th>
          </tr>
        </thead>
        <tbody>
          {timings.dates.map((date, index) => (
            <tr key={index}>
              <td>{date}</td>
              <td>{timings.sehri[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimingDisplay;
