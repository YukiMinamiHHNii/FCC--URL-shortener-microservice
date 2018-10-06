const mongoose = require("mongoose"),
			dotenv = require("dotenv").load(),
			ShortURL = require("../models/shorturlModel");

function handleConnection(connected) {
	mongoose.connect(
		process.env.MONGO_DB_CONNECTION,
		error => {
			error ? connected(false, error) : connected(true, null);
		}
	);
}

exports.readAll = result => {
	handleConnection((connected, error) => {
		ShortURL.find({}, (err, data) => {
			return err ? result(err) : result(null, data);
		});
	});
};

exports.createShortURL = result => {
	handleConnection((connected, error) => {
		let test = new ShortURL({
			originalURL: `original${Math.random()}`,
			shortURL: `short${Math.random()}`
		});
		test.save((err, data) => {
			return err ? result(err) : result(null, data);
		});
	});
};
