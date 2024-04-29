// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const timnasController = require("../controllers/timnasController");

// endpoint mahasiswa
router.get("/", timnasController.viewTimnas); // Untuk view
router.post("/", timnasController.addTimnas); //add data
router.put("/", timnasController.editTimnas); //update

// Lalu export routernya
module.exports = router;