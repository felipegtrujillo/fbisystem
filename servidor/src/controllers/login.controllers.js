const {
  jwt,
  secretKey,
  tokenOptions,
  tokenName,
} = require("../utils/constants.js");

const agentes = require("../../data/agentes.js");

const getToken = async (req, res) => {
  try {
    const { email, password } = req.query;

    console.log(req.query);
    /* Usuario a loguear */
    console.log("USUARIO ENCONTRADO=>");
    const selectedUser = {
      email,
      password,
    };

    /* Verificar que el usuario exista */
    //supuestamente=>buscar en el array de usuarios si existe y si la contraseña coincide? firmo el token : error: usuario y contraseña incorrectos
    let loggedUser = agentes.find(
      (agente) => agente.password === password && agente.email === email
    );

    /* Firma del token solamente si el usuario existe*/
    if (loggedUser) {
      const token = jwt.sign(selectedUser, secretKey, tokenOptions);

      res.status(200).json({
        status: "Ok",
        is_Active: true,
        message: "Usuario logueado",
        token: token,
        tokenName:
        tokenName /* para guardarlo en session storage y luego rescatarlo con el mismo nombre en la peticion */,
        loggedUser: loggedUser,
      });
    } else {
      res
        .status(401)
        .json({
          status: "login invalido",
          message:
            "El usuario y/o la contraseña no son correctos. Vuelve a intentarlo",
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getToken,
};
