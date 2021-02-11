for (var key in document.querySelectorAll("span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0")) {
    item = document.querySelectorAll("span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0")[key].innerText.match("@[A-Za-z0-9\w]+");
    if (item != null)
        console.log(item);
}
