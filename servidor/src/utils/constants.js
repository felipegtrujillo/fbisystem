const jwt = require("jsonwebtoken");
const secretKey = "¿tanto te importa hackear mi login, malaya?";
const tokenOptions = { expiresIn: "120s" };
const tokenName = "jwtToken";

module.exports = { jwt, secretKey, tokenOptions, tokenName };
