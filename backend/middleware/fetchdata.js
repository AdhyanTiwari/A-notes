var jwt = require('jsonwebtoken');

const fetchdata = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(400).json({ error: "please authenticate the token" })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;

        next();
    } catch (error) {
        res.status(400).json({ error: "please authenticate the token correctly" })
    }
}

module.exports = fetchdata;