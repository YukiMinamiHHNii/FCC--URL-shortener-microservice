const dns = require("dns"),
			checkURL = require("valid-url"),
			url = require("url"),
			shorturlDAO = require("../daos/shorturlDAO");

exports.visitShortURL = (req, res) => {
	shorturlDAO.createShortURL((err, res) => {
		err ? console.log(err) : console.log(res);
	});
	shorturlDAO.readAll((err, res) => {
		err ? console.log(err) : console.log(res);
	});
	res.json({ placeholder: req.params.address });
};

exports.genShortURL = (req, res) => {
	validateAddress(req.body.url, (result, data) => {
		if (result) {
			res.json({
				original_url: data,
				short_url: getRand()
			});
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
