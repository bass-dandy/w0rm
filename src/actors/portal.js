import Actor from './actor';
import Rect from '../lib/rect';
import EventBus from '../lib/event-bus';
import Config from '../config';
import Canvas from '../lib/canvas';
import {directions, events} from '../lib/constants';

export default function Portal(pos, dir, color) {
	this.pos = pos;
	this.dir = dir;
	this.color = color;
	this.bounds = new Rect(pos.x, pos.y, this.w, this.h);

	EventBus.on(events.BULLET_OFFSCREEN, this.move.bind(this));
}

Portal.prototype = Object.create(Actor.prototype);

Portal.prototype.constructor = Portal;

Portal.prototype.draw = function() {
	Canvas.drawRect(this.color, this.pos.x, this.pos.y, this.w, this.h);
};

Portal.prototype.move = function(bullet) {
	if (bullet.color === this.color) {
		this.dir = bullet.dir.multiply(-1);

		// center portal over bullet impact
		if (this.dir.equals(directions.UP) || this.dir.equals(directions.DOWN)) {
			this.pos.x = bullet.pos.x - Config.portal.radius;
			this.pos.y = bullet.pos.y;
		} else {
			this.pos.y = bullet.pos.y - Config.portal.radius;
			this.pos.x = bullet.pos.x;
		}

		// keep portal onscreen
		if (this.pos.x < 0) {
			this.pos.x = 0;
		} else if (this.pos.x > Config.scene.cellCount - this.w) {
			this.pos.x = Config.scene.cellCount - this.w;
		}

		if (this.pos.y < 0) {
			this.pos.y = 0;
		} else if (this.pos.y > Config.scene.cellCount - this.h) {
			this.pos.y = Config.scene.cellCount - this.h;
		}

		this.bounds.moveTo(this.pos.x, this.pos.y, this.w, this.h);
	}
};

Object.defineProperties(Portal.prototype, {
	w: {
		get: function() {
			return Math.abs(this.dir.y) * 2 * Config.portal.radius + 1;
		}
	},
	h: {
		get: function() {
			return Math.abs(this.dir.x) * 2 * Config.portal.radius + 1;
		}
	}
});
