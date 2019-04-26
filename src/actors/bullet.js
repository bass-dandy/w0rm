import Actor from './actor';
import EventBus from '../lib/event-bus';
import Rect from '../lib/rect';
import Config from '../config';
import Canvas from '../lib/canvas';
import {events} from '../lib/constants';

const SIZE = 1;

export default function Bullet(pos, dir, color) {
	this.pos = pos;
	this.dir = dir;
	this.color = color;
	this.bounds = new Rect(pos.x, pos.y, SIZE, SIZE);
	this.shouldRemove = false;
}

Bullet.prototype = Object.create(Actor.prototype);

Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {
	this.pos = this.pos.add(this.dir.multiply(Config.bullet.speed));
	this.bounds.moveTo(this.pos.x, this.pos.y);

	if (this.bounds.isOffscreen) {
		EventBus.emit(events.BULLET_OFFSCREEN, this);
		this.shouldRemove = true;
	}
};

Bullet.prototype.draw = function() {
	Canvas.drawRect(this.color, this.pos.x, this.pos.y, SIZE, SIZE);
};
