import Vector from './vector';

export const directions = {
	UP: new Vector(0, -1),
	RIGHT: new Vector(1, 0),
	DOWN: new Vector(0, 1),
	LEFT: new Vector(-1, 0)
};

export const events = {
	FOOD_EATEN: 'food_eaten',
	WORM_DEAD: 'worm_dead',
	BULLET_OFFSCREEN: 'bullet_offscreen'
};
