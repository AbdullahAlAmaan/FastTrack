// src/pages/api/alarms.js
let alarms = []; // In-memory storage for alarms (for demonstration purposes)

const handler = (req, res) => {
    if (req.method === 'GET') {
        // Return the list of alarms
        res.status(200).json(alarms);
    } else if (req.method === 'POST') {
        // Add a new alarm
        const { alarm } = req.body;
        alarms.push(alarm);
        res.status(201).json({ message: 'Alarm added', alarm });
    } else {
        // Method not allowed
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;