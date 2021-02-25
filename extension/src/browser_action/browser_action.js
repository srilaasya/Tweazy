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
			var check=0;
			document.getElementById("greetings").innerText = "Tweazy found:";
			var p=document.createElement("P");
			p.innerText="Click on Username to analyze";
			document.getElementById("printUsernames").appendChild(p);
			results[0].forEach((res)=>{
				var btn = document.createElement("BUTTON");
				btn.innerHTML=results[0][check++];
				btn.style.marginBottom="10px";
				btn.classList.add("btn");
				btn.classList.add("btn-primary");
				document.getElementById("printUsernames").appendChild(document.createElement("BR"));
				document.getElementById("printUsernames").appendChild(btn);
				
			})
			
		}
	);
});
