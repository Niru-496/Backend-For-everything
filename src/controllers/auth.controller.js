const express = require('express');
const { user } = require("../models/user.module");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const newToken = (data) => {
	// console.log(process.env);
	return jwt.sign({ data }, process.env.KEY);
};




const register = async (req, res) => {
	try {
		let data = await user.findOne({ email: req.body.email }).lean().exec();

		if (data)
			return res
				.status(400)
				.send({ message: "User is already registerd with this mail" });

		data = await user.create(req.body);

		const token = newToken(data);
		res.send({ data, token }).status(200);
	} catch (error) {
		res.send(error.message).status(500);
	}
};

const login = async (req, res) => {
	try {
		let data = await user.findOne({ email: req.body.email });

		if (!data)
			return res
				.status(400)
				.send({ message: "username or password is incorrect" });

		const check = data.checkPassword(req.body.password);
		if (!check)
			return res
				.status(400)
				.send({ message: "username or password is incorrect" });

		const token = newToken(data);

		res.send({ data, token }).status(200);
	} catch (error) {
		res.send(error).status(500);
	}
};







module.exports = { register, login };
