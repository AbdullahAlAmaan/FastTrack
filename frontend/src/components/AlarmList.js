// src/components/AlarmList.js
const AlarmList = ({ alarms }) => {
    return (
        <div>
            <h2>Alarms</h2>
            <ul>
                {alarms.map((alarm, index) => (
                    <li key={index}>{alarm}</li>
                ))}
            </ul>
        </div>
    );
};

export default AlarmList;