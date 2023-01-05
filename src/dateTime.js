const dayjs = require("dayjs");

setInterval(() => {
	const dateElement = document.querySelector("#date");
	if (dateElement) {
		dateElement.innerHTML = dayjs().format("YYYY-MM-DD HH:mm:ss");
	}
}, 1000);
