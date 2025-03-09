// src/pages/api/upload.js
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error parsing file' });
        }
        // Handle file processing here (e.g., OCR)
        res.status(200).json({ message: 'File uploaded successfully', files });
    });
};

export default handler;