const express = require("express");
const cors = require("cors");
const { connect } = require("./configs/db");

const { router } = require("./routers/user.routes");

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

app.use("/", router);

app.listen(port, async () => {
	try {
		let conn = await connect();
		console.log(`DB connected and port ${port}`);
	} catch (error) {
		console.log(error);
	}
});
