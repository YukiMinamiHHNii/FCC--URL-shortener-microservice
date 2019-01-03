const express = require("express"),
			router = express.Router(),
			shorturlController = require("../controllers/shorturlController");

router.get("/", shorturlController.getAllShortUrls);
router.post("/new", shorturlController.genShortURL);
router.get("/:address", shorturlController.visitShortURL);

module.exports = router;
