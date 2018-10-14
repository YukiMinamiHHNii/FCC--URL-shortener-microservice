const mongoose = require("mongoose"),
	dotenv = require("dotenv").load(),
	ShortURL = require("../models/shorturlModel");

function handleConnection(connected) {
	mongoose.connect(
		process.env.MONGO_DB_CONNECTION,
		error => {
			error
				? connected(false, { error: "Error while connecting to DB" })
				: connected(true, null);
		}
	);
}

exports.createShortURL = (original, short, result) => {
	handleConnection((connected, error) => {
		if (error) {
			return result(error);
		}
		let shorturl = new ShortURL({
			originalURL: original,
			shortURL: short
		});
		shorturl.save((err, data) => {
			return err
				? result({ error: "Error while creating a new shortURL" })
				: result(null, data);
		});
	});
};

exports.readAll = result => {
	handleConnection((connected, error) => {
		if (error) {
			return result(error);
		}
		ShortURL.find({}, (err, data) => {
			return err
				? result({ error: "Error while reading from DB" })
				: result(null, data);
		});
	});
};

exports.readOneByProperty = (queryObj, result) => {
	if (Object.keys(queryObj).length === 0) {
		return result("A non-empty object is needed for searching");
	} else {
		handleConnection((connected, error) => {
			if (error) {
				return result(error);
			}
			ShortURL.findOne(queryObj, (err, data) => {
				return err
					? result({ error: "Error while reading from DB" })
					: result(null, data);
			});
		});
	}
};
