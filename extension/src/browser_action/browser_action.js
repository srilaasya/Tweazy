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
			document.getElementById("greetings").innerText = "Tweazy found:";
			document.getElementById("getUsernames").hidden = true;
			let p = document.createElement("p");
			p.innerText = "Click any username to analyze";
			document.getElementById("printUsernames").appendChild(p);
			usernames[0].forEach((res) => {
				let btn = document.createElement("button");
				btn.innerHTML = usernames[0][check++];
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
