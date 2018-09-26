exports.index = (req, res) => {
	res.json({ test: getRand() });
};

function getRand() {
	let characters =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_",
			size = 15,
			result = "";

	for (let x = 0; x <= size; x++) {
		result += characters[Math.floor(Math.random() * characters.length)];
	}

	return result;
}
