import Actor from './actor.js';
import Config from '../config.js';
import Rect from '../lib/rect.js';

const SIZE = 1;

export default function Segment(pos) {
	this.pos = pos;
	this.bounds = new Rect(this.pos.x, this.pos.y, SIZE, SIZE);
	this.color = Config.worm.color;
}

Segment.prototype = Object.create(Actor.prototype);

Segment.prototype.draw = function(canvas) {
	canvas.drawRect(this.color, this.pos.x, this.pos.y, SIZE, SIZE);
};

Segment.prototype.tween = function(dir) {
	const transform = dir.multiply(SIZE / 2);
	const tweenedPos = this.pos.add(transform);
	Canvas.drawRect(this.color, tweenedPos.x, tweenedPos.y, SIZE, SIZE);
};
