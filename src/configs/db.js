const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connect = async () => {
	try {
		const conn = mongoose.connect(process.env.DB);
		return conn;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { connect };
