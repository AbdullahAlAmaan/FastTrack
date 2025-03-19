export const fetchTimings = async (timezone) => {
    const imageUrl =
      timezone === 'toronto'
        ? 'https://storage.googleapis.com/suhoor/toronto_timing.jpg'
        : 'https://storage.googleapis.com/suhoor/dhaka_timing.jpg';
  
    try {
      const response = await fetch('/api/timings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });
  
      const data = await response.json();
      return data.timings; // Assuming your API returns { sehri, iftar }
    } catch (error) {
      console.error('Error fetching timings:', error);
      return { sehri: 'Error', iftar: 'Error' };
    }
  };
  