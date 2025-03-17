// src/components/AlarmList.js
import React from 'react';

const AlarmList = ({ alarms }) => {
    return (
        <div>
            <h2>Alarms</h2>
            <ul>
                {alarms.map((alarm, index) => (
                    <li key={index}>
                        Suhoor: {alarm.suhoor} - Iftar: {alarm.iftar}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlarmList;