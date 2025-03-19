import { ImageAnnotatorClient } from '@google-cloud/vision';

// Use service account credentials specified in the GOOGLE_APPLICATION_CREDENTIALS environment variable
const client = new ImageAnnotatorClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageUrl } = req.body;

    // Ensure imageUrl is provided
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    try {
      // Call the Vision API to process the image
      const [result] = await client.textDetection(imageUrl);
      //console.log('Extracted text from image:', result.fullTextAnnotation.text);

      if (!result.fullTextAnnotation) {
        throw new Error('No text detected in the image.');
      }

      const text = result.fullTextAnnotation.text;

      // Parse the extracted text for timings
      const timings = parseTimings(text);

      // Return the extracted timings to the frontend
      res.status(200).json({ timings });
    } catch (error) {
      console.error('Error processing image:', error.message);
      res.status(500).json({ error: `Error processing image: ${error.message}` });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

// Helper function to parse timings from the extracted text
const parseTimings = (text) => {
  const lines = text.split('\n');  // Split the extracted text into lines
  const dates = [];
  const sehriTimes = [];

  // Define regex patterns to capture the dates and times (Sehri times)
  const datePattern = /\d{1,2} [A-Za-z]{3} \d{4}/;  // Match date format like 27 Mar 2025
  const timePattern = /(\d{2}:\d{2} [APM]{2})/g;  // Match time format hh:mm AM/PM

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if the line contains a date
    const dateMatch = line.match(datePattern);
    if (dateMatch) {
      // If a date is found, store it
      dates.push(dateMatch[0]);

      // If the next line contains a Sehri time, capture that too
      if (i + 1 < lines.length) {
        const nextLineMatches = [...lines[i + 1].matchAll(timePattern)];
        if (nextLineMatches.length > 0) {
          sehriTimes.push(nextLineMatches[0][0]);  // Store Sehri time
        }
      }
    }
  }

  // Log the extracted dates and Sehri times for debugging
  console.log("Dates:", dates);
  console.log("Sehri Times:", sehriTimes);

  // Return both arrays
  return { dates, sehri: sehriTimes };
};
