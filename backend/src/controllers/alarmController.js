const Alarm = require('../models/alarmModel');
const { extractTextFromImage } = require('../utils/ocr');


exports.getAlarms = async (req, res) => {
    try {
        const alarms = await Alarm.find(); // Fetch alarms from the database
        res.status(200).json(alarms); // Return the alarms
    } catch (error) {
        res.status(500).json({ message: 'Error fetching alarms', error });
    }
};

exports.uploadAlarm = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Convert the file to a base64 string for the API
        const imageUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

        // Call the OCR function to extract text from the image
        const extractedText = await extractTextFromImage(imageUrl);
        console.log('Extracted Text:', extractedText);

        // Parse the extracted text to find Sehri and Iftar times
        const times = parseTimes(extractedText);
        const newAlarm = { 
            date: new Date().toLocaleDateString(),
            suhoor: times.sehri,
            iftar: times.iftar 
        };

        // Save the new alarm to the database
        const savedAlarm = await Alarm.create(newAlarm);
        res.status(201).json(savedAlarm);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ message: 'Error processing file', error });
    }
};

const parseTimes = (text) => {
    const lines = text.split('\n');
    let sehri, iftar;

    lines.forEach(line => {
        if (line.includes('SEHRI')) {
            sehri = line.split(' ').pop();
        }
        if (line.includes('IFTAR')) {
            iftar = line.split(' ').pop();
        }
    });

    return { sehri, iftar };
};