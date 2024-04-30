const {jwt, secretKey} = require("../utils/constants.js");

const getPage = async (req, res) => {
    try {
        const { token } = req.query;
    
        return jwt.verify(token, secretKey, (err, data) => {
          err
            ? res.status(404).json({
                status: "Error",
                message: "Usuario no encontrado",
                error: err,
              })
            : res
                .status(200)
                .json({ status: "Ok", message: "Gracias por la petición" });
        });
      } catch (error) {
        res.json(error);
      }
};

module.exports = {
  getPage
};
