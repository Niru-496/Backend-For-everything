const express = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize.users");
const { product } = require("../models/product.module");

const productRouter = express.Router();

productRouter.post("", authenticate, authorize(["admin"]), async (req, res) => {
	try {

		const _id = req.user._id;
		const productData = await product.create({
			title: req.body.title,
			price: req.body.price,
			user_id: _id,
			image: req.body.image,
			description: req.body.description,
		});

		return res.send(productData).status(200);
	} catch (e) {
		return res.send({ e }).status(500);
	}
});


productRouter.patch("/:id", authenticate, authorize(["admin"]) , async (req, res) => {
	try {
		const productData = await product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		return res.send(productData).status(200);
	} catch (e) {
		return res.send({ e }).status(500);
	}
});


productRouter.get("", async (req, res) => {
	try {
		const productData = await product.find().lean().exec();

		return res.send(productData).status(200);
	} catch (e) {
		return res.send({ e }).status(500);
	}
});
productRouter.get("/:id", async (req, res) => {
	try {
		const productData = await product.findOne({_id : req.params.id})

		return res.send(productData).status(200);
	} catch (e) {
		return res.send({ e }).status(500);
	}
});







module.exports = { productRouter };
