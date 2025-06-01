const { people } = require("../data");

const auth = (req, res, next) => {
    const userId = parseInt(req.query.user);
    const user = people.find((p) => p.id === userId);
    if (!user) return res.status(401).json({ msg: "Unauthorized" });
    req.user = user;
    next();
};

module.exports = auth;
