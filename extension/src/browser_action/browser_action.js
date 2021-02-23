document.getElementById("getUsernames").addEventListener("click", () => {
	console.log("Popup DOM fully loaded and parsed");
	function getUsernames() {
		let usernames = [];
		document
			.querySelectorAll(
				"span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0"
			)
			.forEach((element) => {
				if (element.innerText.match("@[A-Za-z0-9w]+"))
					usernames.push(
						element.innerText
							.match("@[A-Za-z0-9w]+")[0]
							.substring(1)
					);
			});
		return usernames;
	}
	chrome.tabs.executeScript(
		{
			code: "(" + getUsernames + ")();",
		},
		(results) => {
			console.log(results[0]);
		}
	);
});
