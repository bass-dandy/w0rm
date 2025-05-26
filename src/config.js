import Logo from './logo.js';

export default {
	controls: {
		pause: 27,  // esc
		left: 37,  // left arrow
		up: 38,    // up arrow
		right: 39, // right arrow
		down: 40,  // down arrow
		fire1: 88, // x
		fire2: 90  // z
	},
	scene: {
		color: 'white',
		cellCount: 35,
		updateStep: 33 // ~30 fps
	},
	font: {
		color: '#58595b',
		family: 'monaco',
		size: '14px'
	},
	bullet: {
		speed: 2 // in units per tick
	},
	food: {
		color: 'red'
	},
	portal: {
		radius: 2, // number of units from the center to either edge
		color1: '#1daeec',
		color2: '#fc6a21'
	},
	worm: {
		growthRate: 4,
		color: '#58595b'
	},
	titleScreen: {
		src: Logo
	}
};
