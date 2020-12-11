const jwt = require("jsonwebtoken");
module.exports =  function authCheck(req, res, next) {
    const token = req.query.token;
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, "9993929488@t", (err,email) => {
      if (err) return res.json({'error':'You need to be logged in!'});
      req.email = email
      next() 
    })
  }