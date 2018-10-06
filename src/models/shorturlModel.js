const mongoose = require("mongoose"),
			Schema = mongoose.Schema;

const shorturlSchema = new Schema({
	originalURL: { type: String, required: true }, //if the field does not need additional options like required or default,
	shortURL: { type: String, required: true } //just specifying the type like "property: String" is OK
});

module.exports = mongoose.model("ShortURL", shorturlSchema);
