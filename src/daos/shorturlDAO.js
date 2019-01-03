const mongoose = require("mongoose"),
	ShortURL = require("../models/shorturlModel");

exports.getAllShortUrls = () => {
	return ShortURL.find()
		.select({ __v: 0, _id: 0 })
		.then(foundUrls => {
			return foundUrls;
		})
		.catch(err => {
			return Promise.reject({
				status: "Error while retrieving all registered shortURLs",
				error: err.message
			});
		});
};

exports.createShortURL = (original, short) => {
	return saveShorturl(original, short)
		.then(savedURL => {
			return savedURL;
		})
		.catch(err => {
			return Promise.reject(err);
		});
};

function saveShorturl(originalURL, shortURL) {
	return ShortURL({
		originalURL: originalURL,
		shortURL: shortURL
	})
		.save()
		.then(savedURL => {
			return {
				original_url: savedURL.originalURL,
				short_url: savedURL.shortURL
			};
		})
		.catch(err => {
			return Promise.reject({
				status: "Error while creating new shortURL",
				error: err.message
			});
		});
}

exports.getOriginalURL = shortURL => {
	return readByShortURL(shortURL)
		.then(foundURL => {
			return foundURL;
		})
		.catch(err => {
			return Promise.reject(err);
		});
};

function readByShortURL(shortURL) {
	return ShortURL.findOne({ shortURL: shortURL })
		.exec()
		.then(foundURL => {
			if (foundURL) {
				return foundURL;
			} else {
				return Promise.reject({ status: "Data not found for given shortURL" });
			}
		})
		.catch(err => {
			return Promise.reject({
				status: err.status ? err.status : "Error while reading from DB",
				error: err.message
			});
		});
}
