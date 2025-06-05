export default class Game {
	constructor(
		canvas: HTMLCanvasElement,
		onScoreUpdate?: (score: number) => void
	);

	enableKeyboardControls: void;
	disableKeyboardControls: void;
	play: void;
	pause: void;
	up: void;
	right: void;
	down: void;
	left: void;
	fire1: void;
	fire2: void;
	destroy: void;
}
