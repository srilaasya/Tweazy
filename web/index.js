const express = require("express"),
	app = express(),
	path = __dirname + "/views/",
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	{spawn} = require("child_process");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(express.static(__dirname + "/public"));
app.set("port", 8000);
app.set("views", path);
app.set("view engine", "ejs");
app.listen(app.get("port"), () => {
	console.info("App is running on port", app.get("port"));
});

/*=============================================>>>>>

				= Basic routes =

===============================================>>>>>*/

app.get("/", (_req, res) => {
	res.render("index");
});
app.post("/getRating", (req, res) => {
	var pythonOutput;
	console.log(req.body.input);
	const python = spawn("python", ["get_rating.py", req.body.input]);
	python.stdout.on("data", (data) => {
		pythonOutput = data.toString();
	});
	python.on("close", (code) => {
		console.log(`Python exit code: ${code}`);
		console.log(pythonOutput);
		res.json(pythonOutput);
	});
});

app.use((_req, res) => {
	res.status(404).render("error", {
		errorMessage: "404!",
	});
});