chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.clear();
			console.log("Hello there from Tweazy! 🥳");
			// ----------------------------------------------------------
		}
	}, 10);
});
