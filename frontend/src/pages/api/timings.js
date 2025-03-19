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
  const sehriTimes = [];
  const iftarTimes = [];

  // Define regex patterns to capture times (hh:mm AM/PM)
  const timePattern = /(\d{2}:\d{2} [APM]{2})/g;  // Match time format hh:mm AM/PM

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Extract all times from the current line
    const matches = [...line.matchAll(timePattern)];

    // If there is at least one match, we expect Sehri time first, then Iftar time
    if (matches.length > 0) {
      // Capture the first time as Sehri, and the second one as Iftar if available
      if (i % 2 === 0) {
        // If we're on an even line (Sehri)
        sehriTimes.push(matches[0][0]);
        // If the next line has an Iftar time, capture that
        if (i + 1 < lines.length) {
          const nextLineMatches = [...lines[i + 1].matchAll(timePattern)];
          if (nextLineMatches.length > 0) {
            iftarTimes.push(nextLineMatches[0][0]);
          }
        }
      }
    }
  }

  // Log the extracted times for debugging
  console.log("Sehri Times:", sehriTimes);
  console.log("Iftar Times:", iftarTimes);

  // Return both arrays
  return { sehri: sehriTimes, iftar: iftarTimes };
};
