const { default: mongoose } = require("mongoose");

const connect = () => {
	return mongoose.connect(
		"mongodb+srv://niru143:niru143@practice.dmokj.mongodb.net/MyuserDB?retryWrites=true&w=majority"
	);
};

module.exports = { connect };

