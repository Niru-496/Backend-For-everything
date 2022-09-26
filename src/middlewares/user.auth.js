const jwt = require("jsonwebtoken");

require("dotenv").config();
const verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.KEY, function (err, val) {
			if (err) return reject(err);
			resolve(val);
		});
	});
};

const authenticate = async (req, res, next) => {
	try {
		if (!req.headers.authorization)
			return res.status(400).send({
				message: "Send token in headers.authorization",
				status: 400,
			});
		const token = req.headers.authorization.split(" ")[1];
		let verified = await verifyToken(token);
		req.user = verified.data;
		return next();
	} catch (error) {
		return res
			.status(500)
			.send({ message: `${error.message}`, status: 500 });
	}
};

module.exports = { authenticate };
