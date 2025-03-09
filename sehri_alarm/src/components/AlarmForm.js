// src/components/AlarmForm.js
import { useState } from 'react';
import axios from 'axios';
import { parseScreenshot } from '../utils/ocr'; // Import the OCR utility function

const AlarmForm = ({ addAlarm }) => {
    const [file, setFile] = useState(null);
    const [extractedTimes, setExtractedTimes] = useState([]); // State to hold extracted times

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please upload a file.");
            return;
        }

        // Call the OCR function to parse the uploaded file
        const parsedTimes = await parseScreenshot(file);
        
        // Assuming parsedTimes contains both suhoor and iftar times
        const date = new Date().toLocaleDateString(); // Get the current date
        setExtractedTimes(prev => [...prev, { date, suhoor: parsedTimes.suhoor, iftar: parsedTimes.iftar }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="file" 
                onChange={handleFileChange} 
                accept=".pdf, .jpg, .jpeg, .png" 
                required 
            />
            <button type="submit">Set Alarm</button>
            <div>
                <h3>Extracted Times</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Suhoor Time</th>
                            <th>Iftar Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {extractedTimes.map((time, index) => (
                            <tr key={index}>
                                <td>{time.date}</td>
                                <td>{time.suhoor}</td>
                                <td>{time.iftar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </form>
    );
};

export default AlarmForm;