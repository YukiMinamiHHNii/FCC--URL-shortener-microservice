const express = require("express"),
			router = express.Router(),
			shorturlController = require("../controllers/shorturlController");

router.get("/:address", shorturlController.visitShortURL);
router.post("/new", shorturlController.genShortURL);

module.exports = router;
