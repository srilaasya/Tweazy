const https = require("https");

const data = JSON.stringify({
	document: {
		text:
			"Michael Jordan was one of the best basketball players of all time. Scoring was Jordan stand-out skill, but he still holds a defensive NBA record, with eight steals in a half.",
	},
});

const options = {
	hostname: "nlapi.expert.ai",
	port: 443,
	path: "/v2/analyze/standard/en/entities",
	method: "POST",
	headers: {
		"Content-Type": "application/json; charset=utf-8",
		"Content-Length": data.length,
		"Authorization":
			"Bearer eyJraWQiOiI1RDVOdFM1UHJBajVlSlVOK1RraXVEZE15WWVMMFJQZ3RaUDJGTlhESHpzPSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206Y291bnRyeSI6IklOIiwic3ViIjoiNzY0MmZiYTMtOTdiYy00ODM2LTkyMzQtNmZmODBkY2MxMmEzIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpwZXJzb25hbGl6YXRpb25BdXRoIjoiMSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0FVSGdRMDhDQiIsImNvZ25pdG86dXNlcm5hbWUiOiI3NjQyZmJhMy05N2JjLTQ4MzYtOTIzNC02ZmY4MGRjYzEyYTMiLCJjdXN0b206Y29tcGFueSI6IlN0dWRlbnQiLCJhdWQiOiI1a2g5YzBtb2NuajkyM3FkY2pzazM3OHN2aCIsImV2ZW50X2lkIjoiOTI4Y2FiZWEtNjdlZS00YTlmLWFjMGUtZDFkY2VjYmJjNWMwIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MTQ0NTM0OTgsIm5hbWUiOiJTcmkiLCJleHAiOjE2MTQ1Mzk4OTgsImlhdCI6MTYxNDQ1MzQ5OCwiZmFtaWx5X25hbWUiOiJOdXRoZXRpIiwiZW1haWwiOiJudXRoZXRpLmxhYXN5YUBnbWFpbC5jb20iLCJjdXN0b206bWFya2V0aW5nQXV0aCI6IjEifQ.VxzURWbl0xfwYPYBSLqjJQFhegxpeCUaCk1VXL4ehjred_RPfwB7tyJW_9jqotowEEiAcaakUbdx3VvIIAKC0KAz-nj-xpVfiKOQwN-fEfriMjBdWSUGkRtXUGqIzgdYThrOR_hH3dcTw3EiRTqim2lTu0LahQuT0G52J_X19resixA2o6YyqQ2kiu8cQtqIiyJ3cyisVyRMiYkUw6tzgq__Or6Oalb7eR1KgtyKTaOlXLzd5eW_1sL49bW9yQvnCA8VVNZTXvg4gj4vaG-sFHrYpnmo3MO1zoybLpcoA6-GFxxIrvO49xSnG5re1ASnmTd3kZDTqZB3OtkOs-3N4w",
	},
};

const req = https.request(options, (res) => {
	console.log(`statusCode: ${res.statusCode}`);

	res.on("data", (d) => {
		process.stdout.write(d);
	});
});

req.on("error", (error) => {
	console.error(error);
});

req.write(data);
req.end();
