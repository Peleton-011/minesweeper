export 	const getPlayTimeString = (time) => {
		const centis = (time % 1000).toString().padStart(2, "0");
		const seconds = (Math.floor(time / 1000) % 60)
			.toString()
			.padStart(2, "0");
		const minutes = (Math.floor(time / (1000 * 60)) % 60)
			.toString()
			.padStart(2, "0");
		const hours = (Math.floor(time / (1000 * 60 * 60)) % 24)
			.toString()
			.padStart(2, "0");

		const string = `${time > 60 * 60 * 1000 ? hours + "h " : ""}${time > 60 * 1000 ? minutes + "' " : ""}${seconds},${centis}"`;
		return string;
	};