const express = require("express"),
	app = express(),
	path = __dirname + "/views/",
	morgan = require("morgan");
app.use(morgan("dev"));
app.set("port", 5000);
app.use(express.static(__dirname + "/public"));
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

app.use((_req, res) => {
	res.status(404).render("error", {
		errorMessage: "404!",
	});
});
