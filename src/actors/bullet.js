import Actor from './actor.js';
import Rect from '../lib/rect.js';
import Config from '../config.js';
import {events} from '../lib/constants.js';

const SIZE = 1;

export default function Bullet(eventBus, pos, dir, color) {
	this.pos = pos;
	this.dir = dir;
	this.color = color;
	this.bounds = new Rect(pos.x, pos.y, SIZE, SIZE);
	this.shouldRemove = false;
	this.eventBus = eventBus;
}

Bullet.prototype = Object.create(Actor.prototype);

Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {
	this.pos = this.pos.add(this.dir.multiply(Config.bullet.speed));
	this.bounds.moveTo(this.pos.x, this.pos.y);

	if (this.bounds.isOffscreen) {
		this.eventBus.emit(events.BULLET_OFFSCREEN, this);
		this.shouldRemove = true;
	}
};

Bullet.prototype.draw = function(canvas) {
	canvas.drawRect(this.color, this.pos.x, this.pos.y, SIZE, SIZE);
};
