const express = require("express"),
			router = express.Router(),
			shorturlController = require("../controllers/shorturlController");

router.post("/new", shorturlController.genShortURL);
router.get("/:address", shorturlController.visitShortURL);

module.exports = router;
