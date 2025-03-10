// backend/src/middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided, access denied.' });
    }

    // Here you would typically verify the token (e.g., using JWT)
    // For this example, we'll just simulate token verification
    if (token !== 'your-secret-token') {
        return res.status(401).json({ message: 'Invalid token, access denied.' });
    }

    // If the token is valid, proceed to the next middleware or route handler
    next();
};

module.exports = authMiddleware;