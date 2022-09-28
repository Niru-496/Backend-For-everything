const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isActive: { type: Boolean, required: false, default: true },
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

const checkPassword = function (mewPassword, OldPassword) {
	// const hash = bcrypt.hashSync(mewPassword, 6);
	return bcrypt.compareSync(mewPassword, OldPassword);
};
const user = mongoose.model("user", userSchema);

module.exports = { user, checkPassword };
