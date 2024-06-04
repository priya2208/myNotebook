const jwt = require("jsonwebtoken");
const JWT_SECRET = "Priya@SIGOODGIEL";

// MIDDLE TAKE 3 parameter request, response, NEXT

const fetchuser = (req, res, next) => {
  //get the user form the JWT token and add id to request object

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  //comparing jwt getted from login to our secret key the last part of the JWT token
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "Please authenticate using the Valid credentials" });
  }
};

module.exports = fetchuser;
