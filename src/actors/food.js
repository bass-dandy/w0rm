import Actor from './actor';
import Config from '../config';
import EventBus from '../lib/event-bus';
import Rect from '../lib/rect';
import Vector from '../lib/vector';
import Canvas from '../lib/canvas';
import {events} from '../lib/constants';

const SIZE = 1;

export default function Food() {
	this.pos = new Vector();
	this.bounds = new Rect(this.pos.x, this.pos.y, SIZE, SIZE);

	EventBus.on(events.FOOD_EATEN, this.randomizePos.bind(this));
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

Food.prototype.draw = function() {
	Canvas.drawRect(Config.food.color, this.pos.x, this.pos.y, SIZE, SIZE);
};
