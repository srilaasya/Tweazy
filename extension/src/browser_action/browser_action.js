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
			function addDataToExtension(
				userName,
				date,
				followers,
				following,
				pos,
				neg,
				neutral,
				overall
			) {
				var bodyDiv = document.getElementById("mainPopup");
				while (bodyDiv.firstChild) {
					bodyDiv.removeChild(bodyDiv.firstChild);
				}
				var Name = document.createElement("h4");
				Name.innerText = "User Name " + userName;
				var joined = document.createElement("h5");
				joined.innerText = "Joined on " + date;
				var Followers = document.createElement("h5");
				Followers.innerText =
					"Followers " + followers + " " + "Following " + following;
				var OverallRating = document.createElement("h5");
				OverallRating.innerText = overall;
				var innerDiv = document.createElement("div");
				innerDiv.appendChild(Name);
				innerDiv.appendChild(document.createElement("br"));
				innerDiv.appendChild(joined);
				innerDiv.appendChild(document.createElement("br"));
				innerDiv.appendChild(Followers);
				innerDiv.appendChild(OverallRating);
				bodyDiv.appendChild(innerDiv);

				var outer = document.createElement("ul");
				outer.classList.add("bar-graph");

				var liForPositive = document.createElement("li");
				liForPositive.classList.add("bar", "success");
				liForPositive.style.height = (pos / 50) * 100 + "%";
				var divPos = document.createElement("div");
				divPos.innerText = "positive - " + pos;
				liForPositive.appendChild(divPos);

				var liForNegative = document.createElement("li");
				liForNegative.classList.add("bar", "alert");
				liForNegative.style.height = (neg / 50) * 100 + "%";
				var divNeg = document.createElement("div");
				divNeg.innerText = "Negative - " + neg;
				liForNegative.appendChild(divNeg);

				var liForNeutral = document.createElement("li");
				liForNeutral.classList.add("bar", "warning");
				liForNeutral.style.height = (neutral / 50) * 100 + "%";
				var divNeu = document.createElement("div");
				divNeu.innerText = "Neutral - " + neutral;
				liForNeutral.appendChild(divNeu);

				outer.appendChild(liForPositive);
				outer.appendChild(liForNegative);
				outer.appendChild(liForNeutral);
				bodyDiv.appendChild(outer);
			}
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
						console.log("Sending", ele.innerText, "to NLP API");
						fetch("http://localhost:8000/getRating", {
							method: "post",
							headers: {
								"Content-type":
									"application/x-www-form-urlencoded; charset=UTF-8",
							},
							body: `username=${ele.innerText}`,
						})
							.then((res) => {
								if (res.status === 200) {
									return res.json();
								} else {
									throw new Error(
										"Something went wrong on API server!"
									);
								}
							})
							.then((res) => {
								console.log("API response is:", res);
								addDataToExtension(
									res.username,
									res.joined,
									res.followers,
									res.following,
									res.positive,
									res.negative,
									res.neutral,
									res.overall
								);
							})
							.catch((error) => {
								console.error(error);
							});
					});
				});
		}
	);
});
