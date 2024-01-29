const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

export function verifyJwt(token) {
  return jwt.verify(token, secret);
}

export function createJwt(user) {
  return jwt.sign({ id: user.id }, secret);
}
