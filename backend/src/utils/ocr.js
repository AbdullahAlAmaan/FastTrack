require('dotenv').config();
const fetch = require('node-fetch');

const extractTextFromImage = async (imageUrl) => {
    const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
    const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requests: [
                {
                    image: {
                        content: imageUrl.split(',')[1], // Get the base64 part
                    },
                    features: [
                        {
                            type: 'TEXT_DETECTION',
                        },
                    ],
                },
            ],
        }),
    });

    const data = await response.json();
    return data.responses[0].fullTextAnnotation.text; // Return the extracted text
};

module.exports = { extractTextFromImage };