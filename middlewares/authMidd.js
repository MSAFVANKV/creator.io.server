// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (req.session.userId) {
      next(); // User is logged in, proceed to the next middleware/route handler
    } else {
      res.status(401).send('Unauthorized: Please log in'); // User is not logged in
    }
  };
  
  export default authMiddleware;
  