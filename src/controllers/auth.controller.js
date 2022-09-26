const express = require("express");
const { user } = require("../models/user.module");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const newToken = (data, key, time) => {
	return new Promise((resolve, reject) => {
		jwt.sign({ data }, key, { expiresIn: time }, function (err, token) {
			if (err) {
				reject(err);
			}
			resolve(token);
		});
	});
};

const signup = async (req, res) => {
	try {
		const data = await user
			.findOne({ email: req.body.email })
			.lean()
			.exec();
		if (data)
			return res.status(410).send({
				message: "User is already registerd with this mail",
				status: 410,
			});

		await user.create(req.body);
		return res
			.status(201)
			.send({ message: `signup completed sucessfully`, status: 201 });
	} catch (error) {
		return res
			.status(500)
			.send({ message: `${error.message}`, status: 500 });
	}
};

const signin = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (email && password) {
			let data = await user
				.findOne({ email: req.body.email })
				.lean()
				.exec();
			if (!data)
				return res.status(400).send({
					message: ` message: "username or password is incorrect"`,
					status: 400,
				});
			const check = data.checkPassword(password);
			if (!check)
				return res.status(400).send({
					message: "username or password is incorrect",
					status: 400,
				});
			data.password = null;
			const token = newToken(data, process.env.KEY, "1d");

			return res.status(200).send({
				message: `User signin sucessfully`,
				status: 200,
				token,
			});
		} else {
			return res
				.status(400)
				.send({
					message: `email or password are missing`,
					status: 400,
				});
		}
	} catch (error) {
		return res
			.status(500)
			.send({ message: `${error.message}`, status: 500 });
	}
};

module.exports = { signup, signin, newToken };
