const { Router } = require("express");
const router = Router(); 
const {
  getPage
} = require("../controllers/restringidas.controllers.js");

/* GET => CONSULTA */
router.get("",  getPage);

module.exports = router;