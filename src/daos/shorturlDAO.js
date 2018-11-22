const mongoose = require("mongoose"),
	dotenv = require("dotenv").load(),
	ShortURL = require("../models/shorturlModel");

function handleConnection() {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(process.env.MONGO_DB_CONNECTION)
			.then(() => {
				resolve();
			})
			.catch(err => {
				reject({ status: "Error while connecting to DB", error: err.message });
			});
	});
}

exports.createShortURL = (original, short) => {
	return new Promise((resolve, reject) => {
		handleConnection()
			.then(() => {
				return saveShorturl(original, short);
			}).then(savedURL=>{
				resolve(savedURL);
			})
			.catch(err => {
				reject(err);
			});
	});
};

function saveShorturl(originalURL, shortURL) {
	return new Promise((resolve, reject) => {
		new ShortURL({
			originalURL: originalURL,
			shortURL: shortURL
		})
			.save()
			.then(savedURL => {
				resolve({
					original_url: savedURL.originalURL,
					short_url: savedURL.shortURL
				});
			})
			.catch(err => {
				reject({
					status: "Error while creating new shortURL",
					error: err.message
				});
			});
	});
}

exports.getOriginalURL = shortURL => {
	return new Promise((resolve, reject) => {
		handleConnection()
			.then(() => {
				return readByShortURL(shortURL);
			}).then(foundURL=>{
				resolve(foundURL);
			})
			.catch(err => {
				reject(err);
			});
	});
};

function readByShortURL(shortURL) {
	return new Promise((resolve, reject) => {
		ShortURL.findOne({ shortURL: shortURL })
			.exec()
			.then(foundURL => {
				if (foundURL) {
					resolve(foundURL);
				} else {
					reject({ status: "Data not found for given shortURL" });
				}
			})
			.catch(err => {
				reject({ status: "Error while reading from DB", error: err.message });
			});
	});
}
