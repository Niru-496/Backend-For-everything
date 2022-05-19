const express = require("express");
const jwt = require("jsonwebtoken");

const { user } = require("../models/user.module");

const { authenticate } = require("../middlewares/authenticate");

require("dotenv").config();

const newToken = (data) => {
	// console.log(process.env);
	return jwt.sign({ data }, process.env.KEY);
};
const userRouter = express.Router();


userRouter.get("/:id", async (req,res) => {
    try {
        		const data = await user.findOne({
					_id: req.params.id,
				});

                // const token = newToken(data)
				return res.send(data).status(200);

    } catch (error) {
		res.send(error.message).status(501);

    }
})

userRouter.put("", authenticate, async (req, res) => {
	try {

		let data = await user.findByIdAndUpdate(req.user._id, req.body, {
			new: true,
		});
		const token = newToken(data);
		res.send({ data, token }).status(200);
	} catch (error) {
		res.send(error.message).status(501);
	}
});

userRouter.delete("", authenticate, async (req, res) => {
	try {

        const data = await user.findByIdAndDelete(req.user._id , {new:true})
        res.send(`${data.fullName} is removed permanently`).status(200);
	} catch (error) {
		res.send(error.message).status(501);
	}
});


module.exports = { userRouter };