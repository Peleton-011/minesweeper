export function getCellSize(
	width: number,
	height: number,
) {
	const boardWidth = Math.min(width, height);

	// 1.2 is a magic number to add a bit of margin, so the board doesn't fill up the entire screen
	return Math.floor(window.innerWidth / boardWidth / 1.2);
}
