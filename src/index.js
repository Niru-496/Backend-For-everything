const express = require("express");
const { connect } = require("./configs/db");

const { register, login, Fulldata } = require("./controllers/auth.controller");
const { productRouter } = require("./controllers/Product.controller");


const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", register);
app.post("/login", login);
app.use("/product",productRouter)
// app.use("/user",)

app.listen(port, async () => {
	try {
		await connect();

		console.log(`DB connected and port ${port}`);
	} catch (error) {

		console.log(error);
	}
});

