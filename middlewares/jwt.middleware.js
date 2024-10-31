const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    const secret = process.env.JWT_SECRET || "your_jwt_secret";

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = user; // Store the user info from token in req
        next();
    });
};

module.exports = { authenticateToken };