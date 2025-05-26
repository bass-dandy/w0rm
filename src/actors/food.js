import Actor from './actor.js';
import Config from '../config.js';
import Rect from '../lib/rect.js';
import Vector from '../lib/vector.js';
import {events} from '../lib/constants.js';

const SIZE = 1;

export default function Food(eventBus) {
	this.pos = new Vector();
	this.bounds = new Rect(this.pos.x, this.pos.y, SIZE, SIZE);

	eventBus.on(events.FOOD_EATEN, this.randomizePos.bind(this));
	this.randomizePos();
}

Food.prototype = Object.create(Actor.prototype);

Food.prototype.constructor = Food;

Food.prototype.randomizePos = function() {
	// Math.round keeps us on-grid
	// Config.scene.cellCount - SIZE keeps us on-screen
	this.pos.x = Math.round(
		Math.random() * (Config.scene.cellCount - SIZE)
	);
	this.pos.y = Math.round(
		Math.random() * (Config.scene.cellCount - SIZE)
	);
	this.bounds.moveTo(this.pos.x, this.pos.y);
};

Food.prototype.draw = function(canvas) {
	canvas.drawRect(Config.food.color, this.pos.x, this.pos.y, SIZE, SIZE);
};
