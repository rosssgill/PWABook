import jwt from "jsonwebtoken";

// See if the user is who they claim to be using middleware, to check for valid token
// E.g. user wants to like post, they click like button => auth middleware => like post if okay (next)
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomToken = token.length < 500; // Checking if the token is a custom one or google authorized one

    let decodedData;

    if (token && isCustomToken) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log("Error authenticating user", error);
  }
};

export default auth;
