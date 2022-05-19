const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: [{ type: String, required: false, default: "customer" }],
		isAdmin: { type: Boolean, required: false, default:false },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

userSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();

	var hash = bcrypt.hashSync(this.password, 6);

	this.password = hash;

	return next();
});

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};
const user = mongoose.model("user", userSchema);

module.exports = { user };
