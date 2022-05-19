const jwt = require("jsonwebtoken");


require("dotenv").config();
const verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.KEY, function (e, val) {
			if (e) return reject(e);
			resolve(val);
		});
	});
};

const authenticate = async (req, res, next) => {
	if (!req.headers.authorization)
		return res.send({ message: "Bearer token was not provided" }).status(400);
	const token = req.headers.authorization.split(" ")[1];

	let verified;
	try {
		verified = await verifyToken(token);

	} catch (error) {
		console.log(error);
	}

	req.user = verified.data;

	return next();
};

module.exports = { authenticate };

