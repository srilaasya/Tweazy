document.getElementById("getUsernames").addEventListener("click", () => {
	console.log("Popup DOM fully loaded and parsed");
	function getUsernames() {
		let usernames = [];
		document
			.querySelectorAll(
				"span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0"
			)
			.forEach((element) => {
				if (element.innerText.match("^@[a-zA-Z0-9_]{0,15}$"))
					if (
						!usernames.includes(
							element.innerText
								.match("^@[a-zA-Z0-9_]{0,15}")[0]
								.substring(1)
						)
					)
						usernames.push(
							element.innerText
								.match("^@[a-zA-Z0-9_]{0,15}")[0]
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
			var check = 0;
			document.getElementById("greetings").innerText = "Tweazy found:";
			document.getElementById("getUsernames").hidden = true;
			var p = document.createElement("p");
			p.innerText = "Click any username to analyze";
			document.getElementById("printUsernames").appendChild(p);
			results[0].forEach((res) => {
				var btn = document.createElement("BUTTON");
				btn.innerHTML = results[0][check++];
				btn.style.marginBottom = "10px";
				btn.classList.add("btn");
				btn.classList.add("btn-outline-primary");
				document
					.getElementById("printUsernames")
					.appendChild(document.createElement("BR"));
				document.getElementById("printUsernames").appendChild(btn);
			});
		}
	);
});
