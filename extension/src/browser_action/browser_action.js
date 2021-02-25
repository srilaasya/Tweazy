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
				"tweazyHeading"
			).innerText = `Tweazy has found ${usernames[0].length}`;
			document.getElementById("tweazyBody").innerText =
				"Click any username to analyze:";
			document.getElementById("getUsernames").hidden = true;
			let div = document.createElement("div");
			div.classList.add("d-grid", "gap-2", "d-md-block");
			document.getElementById("tweazyBody").appendChild(div);
			usernames[0].forEach(() => {
				let btn = document.createElement("button");
				btn.innerHTML = usernames[0][check++];
				btn.classList.add(
					"btn",
					"btn-outline-primary",
					"usernameButton"
				);
				div.appendChild(btn);
			});
			document
				.querySelectorAll("button.usernameButton")
				.forEach((ele) => {
					ele.addEventListener("click", () => {
						fetch("https://tweazy.herokuapp.com/getRating", {
							method: "post",
							headers: {
								"Content-type":
									"application/x-www-form-urlencoded; charset=UTF-8",
							},
							body: "username=n_sri_laasya",
						})
							.then((response) => {
								if (response.status === 200) {
									return response.json();
								} else {
									throw new Error(
										"Something went wrong on api server!"
									);
								}
							})
							.then((response) => {
								console.debug(response);
								// ...
							})
							.catch((error) => {
								console.error(error);
							});
						// fetch("/getRating", {
						// 					method: "POST",
						// 					body: '{"username": ele.innerText}'
						// 				})
						// 					.then(function(response) {
						// 						if (response.status !== 200) {
						// 							alert(
						// 								"Looks like there was a problem. Status Code: " +
						// 									response.status
						// 							);
						// 							return;
						// 						}
						// 						response.json().then(function(data) {
						// 							console.log(data)
						// 						});
						// 					})
						// 					.catch(function(err) {
						// 						alert("Fetch Error :-S", err);
						// 					});
						// 			});
					});
				});
		}
	);
});
