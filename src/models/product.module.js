const mongoose = require("mongoose");



const reviewSchema = new mongoose.Schema({
	name: { type: String, required: true },
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
});
const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		// user_id: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "user",
		// 	required: true,
		// },
		reviews: [reviewSchema],
		image: { type: String, required: true },
		description: { type: String, required: true },
		countInStock: { type: Number, required: true, default: 0 },
		rating: { type: Number, required: false, default: 0 },
		numReviews: { type: Number, required: false, default: 0 },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const product = mongoose.model("product", productSchema);

module.exports = { product };
