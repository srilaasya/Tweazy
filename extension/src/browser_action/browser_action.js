document.getElementById("getUsernames").addEventListener("click", () => {
	function getUsernames() {
		let usernames = [];
		document
			.querySelectorAll(
				"span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0"
			)
			.forEach((ele) => {
				let usernameRegExp = ele.innerText.match(
					"^@[a-zA-Z0-9_]{0,15}$"
				);
				if (usernameRegExp) {
					let username = usernameRegExp[0].substring(1);
					usernames.includes(username) || usernames.push(username);
				}
			});
		return usernames;
	}
	chrome.tabs.executeScript(
		{
			code: "(" + getUsernames + ")();",
		},
		(usernames) => {
			let check = 0;
			document.getElementById(
				"greetings"
			).innerText = `Tweazy has found ${usernames[0].length}`;
			document.getElementById("printUsernames").innerText =
				"Click any username to analyze:";
			document.getElementById("getUsernames").hidden = true;
			let div = document.createElement("div");
			div.classList.add("d-grid", "gap-2", "d-md-block");
			document.getElementById("printUsernames").appendChild(div);
			usernames[0].forEach(() => {
				let btn = document.createElement("button");
				btn.innerHTML = usernames[0][check++];
				btn.classList.add("btn", "btn-outline-primary");
				div.appendChild(btn);
			});
		}
	);
});
