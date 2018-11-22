const dns = require("dns"),
	checkURL = require("valid-url"),
	url = require("url"),
	shorturlDAO = require("../daos/shorturlDAO");

exports.genShortURL = (req, res) => {
	validateAddress(req.body.url)
		.then(address => {
			return shorturlDAO.createShortURL(address, getRand());
		})
		.then(result => {
			return res.json(result);
		})
		.catch(err => {
			return res.json(err);
		});
};

exports.visitShortURL = (req, res) => {
	shorturlDAO
		.getOriginalURL(req.params.address)
		.then(result => {
			res.redirect(302, result.originalURL);
		})
		.catch(err => {
			return res.json(err);
		});
};

function validateAddress(address) {
	return new Promise((resolve, reject) => {
		if (checkURL.isUri(address)) {
			dns.resolve(url.parse(address).hostname, (err, res) => {
				if (err) {
					reject({ status: "Invalid URL" });
				} else {
					resolve(address);
				}
			});
		} else {
			reject({ status: "Invalid URL" });
		}
	});
}

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
