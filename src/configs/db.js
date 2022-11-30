const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connect = async () => {
	try {
		const conn = await mongoose.connect("mongodb+srv://niru143:niru143@practice.dmokj.mongodb.net/MyuserDB?retryWrites=true&w=majority");
		return conn;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { connect };
