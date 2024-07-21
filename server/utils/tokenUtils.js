import jwt from "jsonwebtoken";

export const createJWT = (payLoad) => {
  const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJwt = (token) => {
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  return decoded;
};
