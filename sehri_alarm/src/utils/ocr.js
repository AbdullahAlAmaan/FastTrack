// src/utils/ocr.js
import Tesseract from 'tesseract.js';
import { getDocument } from 'pdfjs-dist/build/pdf';

export const parseScreenshot = async (file) => {
    const fileType = file.type;

    if (fileType.startsWith('image/')) {
        // Handle image files (JPG, PNG)
        return await parseImage(file);
    } else if (fileType === 'application/pdf') {
        // Handle PDF files
        return await parsePDF(file);
    } else {
        throw new Error('Unsupported file type');
    }
};

const parseImage = async (file) => {
    const { data: { text } } = await Tesseract.recognize(file, 'eng');
    // Extract suhoor and iftar times from the text
    const parsedTimes = extractTimesFromText(text);
    return parsedTimes;
};

const parsePDF = async (file) => {
    const pdfData = await getDocument({ data: file }).promise;
    const numPages = pdfData.numPages;
    let text = '';

    for (let i = 1; i <= numPages; i++) {
        const page = await pdfData.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        text += pageText + ' ';
    }

    // Extract suhoor and iftar times from the text
    const parsedTimes = extractTimesFromText(text);
    return parsedTimes;
};

const extractTimesFromText = (text) => {
    // Implement your logic to extract suhoor and iftar times from the text
    // For example, you might use regex to find time patterns
    const suhoorMatch = text.match(/(\d{1,2}:\d{2})/); // Example regex for time
    const iftarMatch = text.match(/(\d{1,2}:\d{2})/); // Adjust regex as needed

    return {
        suhoor: suhoorMatch ? suhoorMatch[0] : '05:00', // Default value if not found
        iftar: iftarMatch ? iftarMatch[0] : '18:30', // Default value if not found
    };
};