// src/pages/index.js
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import AlarmForm from '../components/AlarmForm';
import AlarmList from '../components/AlarmList';
import axios from 'axios';
import '../styles/globals.css';

const Home = () => {
    const [alarms, setAlarms] = useState([]);

    const addAlarm = (alarm) => {
        setAlarms([...alarms, alarm]);
    };
    const fetchAlarms = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/alarms`);
            setAlarms(response.data);
        } catch (error) {
            console.error('Error fetching alarms:', error.response ? error.response.data : error.message);
        }
    };

    // Fetch alarms from the backend
    useEffect(() => {
        const Alarms = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/alarms`);
                setAlarms(response.data);
            } catch (error) {
                console.error('Error fetching alarms:', error);
            }
        };

        fetchAlarms();
    }, []);

    return (
        <div>
            <Header />
            <AlarmForm addAlarm={addAlarm} />
            <AlarmList alarms={alarms} /> {/* Pass alarms to AlarmList */}
        </div>
    );
};

export default Home;