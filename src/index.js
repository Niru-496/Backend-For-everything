const express = require("express");
const cors = require("cors");
const { connect } = require("./configs/db");
require("dotenv").config();
const { router } = require("./routers/user.routes");

// const { passport } = require("./configs/g-auth");
// const session = require("express-session");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	})
);

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api", router);
// app.use(
// 	session({
// 		resave: false,
// 		saveUninitialized: true,
// 		secret: process.env.GOOGLE_CLIENT_SECRET,
// 	})
// );

// passport.serializeUser(function (user, done) {
// 	done(null, user);
// });

// passport.deserializeUser(function (user, done) {
// 	done(null, user);
// });

// app.get(
// 	"/auth/google",
// 	passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
// 	"/auth/google/callback",
// 	passport.authenticate("google", {
// 		failureRedirect: "/auth/google/failure",
// 	}),
// 	(req, res) => {
// 		const { user } = req;
// 		return res.send({ user });
// 	}
// );

app.listen(port, async () => {
	try {
		let conn = await connect();
		console.log(`DB connected and port ${port}`);
	} catch (error) {
		console.log(error);
	}
});
