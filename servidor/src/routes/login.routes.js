const { Router } = require("express");
const router = Router(); 
const {
  getToken
} = require("../controllers/login.controllers.js");

/* GET => CONSULTA */
router.get("",  getToken);

module.exports = router;
