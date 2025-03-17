// src/components/AlarmForm.js
import { useState } from 'react';
import axios from 'axios';
import { parseScreenshot } from '../utils/ocr'; // Import the OCR utility function

const AlarmForm = ({ addAlarm }) => {
    const [file, setFile] = useState(null);
    const [extractedTimes, setExtractedTimes] = useState([]); // State to hold extracted times
    const [loading, setLoading] = useState(false); // State to manage loading status
    const [error, setError] = useState(null); // State to manage error messages

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log('Selected file:', selectedFile); // Log the selected file

        if (selectedFile) {
            // Automatically process the file when selected
            await handleSubmit(selectedFile);
        }
    };

    const handleSubmit = async (file) => {
        setLoading(true); // Set loading state
        setError(null); // Reset error state

        try {
            // Call the OCR function to parse the uploaded file
            const parsedTimes = await parseScreenshot(file);
            console.log('Parsed times:', parsedTimes); // Log the parsed times

            // Assuming parsedTimes contains both suhoor and iftar times
            const date = new Date().toLocaleDateString(); // Get the current date
            const newAlarm = { date, suhoor: parsedTimes.suhoor, iftar: parsedTimes.iftar };

            // Update the state with the new alarm
            setExtractedTimes(prev => [...prev, newAlarm]);

            // Optionally, send the new alarm to the backend
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/alarms`, newAlarm);
            addAlarm(response.data); // Assuming the response contains the saved alarm

        } catch (error) {
            console.error('Error processing file:', error);
            setError('Failed to process the file. Please try again.'); // Set error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form>
            <input 
                type="file" 
                onChange={handleFileChange} 
                accept=".pdf, .jpg, .jpeg, .png" 
                required 
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Set Alarm'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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