const dns = require("dns"),
	checkURL = require("valid-url"),
	url = require("url"),
	shorturlDAO = require("../daos/shorturlDAO");

exports.visitShortURL = (req, res) => {
	shorturlDAO.readOneByProperty(
		{ shortURL: req.params.address },
		(readErr, shortURLData) => {
			if (!readErr) {
				if (shortURLData !== null) {
					res.redirect(302, shortURLData.originalURL);
				} else {
					res.json({ error: "invalid shortURL" });
				}
			} else {
				res.json({ error: "Error reading from DB" });
			}
		}
	);
};

exports.genShortURL = (req, res) => {
	validateAddress(req.body.url, (valid, addressData) => {
		if (valid) {
			shorturlDAO.readOneByProperty(
				{ originalURL: addressData },
				(readErr, shortURLData) => {
					if (!readErr) {
						if (shortURLData !== null) {
							res.json({
								original_url: shortURLData.originalURL,
								short_url: shortURLData.shortURL
							});
						} else {
							shorturlDAO.createShortURL(
								addressData,
								getRand(),
								(saveErr, saveData) => {
									if (saveErr) {
										res.json({ error: "Error while saving to DB" });
									} else {
										res.json({
											original_url: saveData.originalURL,
											short_url: saveData.shortURL
										});
									}
								}
							);
						}
					} else {
						res.json({ error: "Error reading from DB" });
					}
				}
			);
		} else {
			res.json({ error: "invalid URL" });
		}
	});
};

function getRand() {
	let characters =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_",
		size = 10,
		result = "";

	for (let x = 0; x <= size; x++) {
		result += characters[Math.floor(Math.random() * characters.length)];
	}

	return result;
}

function validateAddress(address, callback) {
	if (checkURL.isUri(address)) {
		dns.resolve(url.parse(address).hostname, (err, res) => {
			err ? callback(false, null) : callback(true, address);
		});
	} else {
		callback(false, null);
	}
}
