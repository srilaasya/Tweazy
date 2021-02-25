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
app.set("views", path);
app.set("view engine", "ejs");
app.listen(process.env.PORT || 8000, () => {
	console.info("App is running on port", process.env.PORT || 8000);
});


/*=============================================>>>>>

				= Basic routes =

===============================================>>>>>*/

app.get("/", (_req, res) => {
	res.render("index");
});
app.get("/download", (_req, res) => {
	res.download("./extension.crx");
});
app.post("/getRating", (req, res) => {
	res.header(
		"Access-Control-Allow-Origin",
		"*"
	);
	let pythonOutput;
	console.log("Username from extension is",req.body.username)
	const python = spawn("python", ["get_rating.py", req.body.username]);
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
