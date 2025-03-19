import React, { useState, useEffect } from 'react';
import TimezoneSelector from '../components/TimeZoneSelector'; // Adjust path if necessary
import TimingDisplay from '../components/TimingDisplay'; // Adjust path if necessary
import NotificationSettings from '../components/NotificationSettings'; // Adjust path if necessary
import { fetchTimings } from '../utils/fetchTimings'; // Adjust path if necessary

const IndexPage = () => {
  const [timezone, setTimezone] = useState('toronto'); // Default timezone
  const [timings, setTimings] = useState({ sehri: [], iftar: [] }); // Default empty arrays
  const [offset, setOffset] = useState(20); // Default offset to 20 minutes

  // Fetch timings whenever the timezone is changed
  useEffect(() => {
    const fetchData = async () => {
      const timingData = await fetchTimings(timezone);
      setTimings(timingData);  // Set timings (either Sehri or Iftar) from the API
    };

    fetchData();
  }, [timezone]); // Fetch data when the timezone changes

  const handleTimezoneChange = (newTimezone) => {
    setTimezone(newTimezone); // Update timezone
  };

  const handleOffsetChange = (newOffset) => {
    setOffset(newOffset); // Update offset for notifications
  };

  return (
    <div>
      <h1>FastTrack</h1>
      <TimezoneSelector onTimezoneChange={handleTimezoneChange} />
      <TimingDisplay timings={timings} />
      <NotificationSettings onSetOffset={handleOffsetChange} />
    </div>
  );
};

export default IndexPage;
