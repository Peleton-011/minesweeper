export const getPlayTimeString = (time) => {
	//
	const centis = (time % 1000).toString().padStart(2, "0").slice(0, 2);
	const seconds = (Math.floor(time / 1000) % 60).toString().padStart(2, "0");
	const minutes = (Math.floor(time / (1000 * 60)) % 60)
		.toString()
		.padStart(2, "0");
	const hours = (Math.floor(time / (1000 * 60 * 60)) % 24)
		.toString()
		.padStart(2, "0");

	const string = `${time > 60 * 60 * 1000 ? hours + "h " : ""}${time > 60 * 1000 ? minutes + "' " : ""}${seconds},${centis}"`;
	return string;
};

export const getDateString = (time) => {
	const date = new Date(time);
	const day = date.getDate().toString();
	let month;
	switch (date.getMonth()) {
		case 0:
			month = "Jan";
			break;
		case 1:
			month = "Feb";
			break;
		case 2:
			month = "Mar";
			break;
		case 3:
			month = "Apr";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "Jun";
			break;
		case 6:
			month = "Jul";
			break;
		case 7:
			month = "Aug";
			break;
		case 8:
			month = "Sep";
			break;
		case 9:
			month = "Oct";
			break;
		case 10:
			month = "Nov";
			break;
		case 11:
			month = "Dec";
			break;
		default:
			break;
	}

	const year = date.getFullYear();
	return `${day} ${month.toLowerCase()}. ${year}`;
};
