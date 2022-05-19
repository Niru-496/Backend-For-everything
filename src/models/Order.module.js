const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		orderItems: [
			{
				name: { type: String, required: true },
				image: { type: String, required: true },
				qty: { type: Number, required: true },
				price: { type: Number, required: true },
				product_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "product",
					required: true,
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: Number, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: { type: String },
		paymentResult: {
			id: { type: String },
			status: { type: String },
			updated_time: { type: String },
			email_address: { type: String },
		},

		taxPrice: { type: Number, required: true, default: 0.0 },
		shippingPrice: { type: Number, required: true, default: 0.0 },
		totalPrice: { type: Number, required: true, default: 0.0 },
		isPaid: { type: Boolean, required: true, default: false },
		paidAt: { type: Date},
		isDelivered: { type: Boolean, required: true, default: false },


	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };