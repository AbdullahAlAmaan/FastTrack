import React, { useState, useEffect } from 'react';
import TimezoneSelector from '../components/TimeZoneSelector'; // Adjust path if necessary
import TimingDisplay from '../components/TimingDisplay'; // Adjust path if necessary
import NotificationSettings from '../components/NotificationSettings'; // Adjust path if necessary
import AlarmSound from '../components/AlarmSound'; // Import AlarmSound component
import { fetchTimings } from '../utils/fetchTimings'; // Adjust path if necessary

const IndexPage = () => {
  const [timezone, setTimezone] = useState('toronto'); // Default timezone
  const [timings, setTimings] = useState({ dates: [], sehri: [] }); // Default empty arrays for dates and sehri times
  const [offset, setOffset] = useState(20); // Default offset to 20 minutes
  const [loading, setLoading] = useState(true); // Loading state to track if data is being fetched

  // Fetch timings whenever the timezone is changed
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true while fetching data
      const timingData = await fetchTimings(timezone);
      setTimings(timingData);  // Set timings (either Sehri or Iftar) from the API
      setLoading(false); // Set loading state to false after data is fetched
    };

    fetchData();
  }, [timezone]); // Fetch data when the timezone changes

  const handleTimezoneChange = (newTimezone) => {
    setTimezone(newTimezone); // Update timezone
  };

  const handleOffsetChange = (newOffset) => {
    setOffset(newOffset); // Update offset for notifications
  };

  // Function to find the Sehri time for today based on current date
  const getSehriTimeForToday = () => {
    const today = new Date().toLocaleDateString();  // Get today's date
    const dateIndex = timings.dates.findIndex((date) => date === today); // Find the index of today's date

    if (dateIndex !== -1) {
      return timings.sehri[dateIndex];  // Return the corresponding Sehri time for today
    }
    return null;
  };

  return (
    <div className="container">
      <div className="header">
        <h1>FastTrack</h1>
      </div>

      {/* Date Selector and Offset Section */}
      <div className="date-selector">
        <NotificationSettings onSetOffset={handleOffsetChange} />
      </div>

      {/* Pass the necessary props to AlarmSound */}
      <div className="alarm-sound">
      <AlarmSound 
        offset={offset} 
        sehriTime={getSehriTimeForToday()}  // Get Sehri time for today
      />
      </div>

      {/* Timezone Selector */}
      <div className="timezone-selector">
        <TimezoneSelector onTimezoneChange={handleTimezoneChange} />
      </div>

      {/* Show Loading Indicator while fetching timings */}
      {loading ? (
        <div className="loading-indicator">Loading Timings...</div>
      ) : (
        // Timing Display Table Section
        <div className="table-section">
          <TimingDisplay timings={timings} />
        </div>
      )}
    </div>
  );
};

export default IndexPage;
