const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Check for the presence of the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid JWT token" });
    }

    // Attach the user object to the request for further use
    req.user = user;
    next();
  });
}

module.exports = authMiddleware;
