const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticationToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in!" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, "tcmTM", (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token!" });
    }

    const authClaims = payload.authClaims || [];
    const usernameClaim = authClaims.find((claim) => claim.name)?.name;

    if (!usernameClaim) {
      return res.status(401).json({ error: "Invalid token structure!" });
    }

    // Find the user by username and attach to the request object
    User.findOne({ username: usernameClaim })
      .then((userdata) => {
        if (!userdata) {
          return res.status(401).json({ error: "User not found!" });
        }

        req.user = userdata; // Attach user data to the request
        next(); // Proceed to the next middleware/controller
      })
      .catch((dbErr) => {
        console.error("Database Query Error:", dbErr);
        res.status(500).json({ error: "Internal server error!" });
      });
  });
};

module.exports = { authenticationToken };
