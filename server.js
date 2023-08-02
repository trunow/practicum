require("dotenv").config();

const express = require("express");
const cors = require("cors");
const auth = require("./back/auth.js");
const door = require("./back/door.js");

const app = express();
const port = process.env.PORT ?? 3003;

app.use(express.static("front/dist"));
app.use(cors({ origin: "*" }));

app.use(auth);

app.get("/me", (req, res) => {
	const user = req.user ?? {},//{token: 0},
		data = user?.id
			? {
					github: "https://github.com/trunow/practicum",
					youtube: "https://youtube.com/@trunow",
			  }
			: {};

	res.send({ data, user });
});

app.post("/me", (req, res) => {
	if (req.user?.id) {
		res.send({ user: req.user, type: "silent" });
	} else if (!req.query.email) {
		res.send({ user: { error: "email" } });
	} else {
		door(req, res);
		// res.send({ user: door(req) });

	}
});

app.listen(port, () => {
	console.log(`http://127.0.0.1:${port}`);
});
