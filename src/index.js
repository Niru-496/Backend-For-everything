const express = require("express");
const cors = require("cors");
const { connect } = require("./configs/db");

const { register, login, Fulldata } = require("./controllers/auth.controller");
const { productRouter } = require("./controllers/Product.controller");
const { errorHandler, notFound } = require("./middlewares/Errors");
const { userRouter } = require("./routers/userRouter");


const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	})
);


const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", register);
app.post("/login", login);
app.use("/product",productRouter)
app.use("/profile",userRouter)
// app.use(errorHandler)
// app.use(notFound)

app.listen(port, async () => {
	try {
		await connect();

		console.log(`DB connected and port ${port}`);
	} catch (error) {

		console.log(error);
	}
});

