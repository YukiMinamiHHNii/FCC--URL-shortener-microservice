const express = require("express"),
			router = express.Router(),
			shorturlController = require("../controllers/shorturlController");

router.get("/", shorturlController.index);

module.exports = router;
