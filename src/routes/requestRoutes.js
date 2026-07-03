const express = require("express");
const requestController = require("../controllers/requestController");

const router = express.Router();

router.post("/", requestController.createRequest); // POST   /api/requests
router.get("/", requestController.getAllRequests); // GET    /api/requests
router.get("/:id", requestController.getRequestById); // GET    /api/requests/:id
router.patch("/:id/status", requestController.updateRequestStatus); // PATCH /api/requests/:id/status

module.exports = router;
