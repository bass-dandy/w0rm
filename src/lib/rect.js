import Config from '../config';

export default function Rect(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Rect.prototype.overlaps = function(other) {
	const overlapsBottomRight = this.left >= other.left
		&& this.left < other.right
		&& this.top >= other.top
		&& this.top < other.bottom;

	const overlapsTopLeft = other.left >= this.left
		&& other.left < this.right
		&& other.top >= this.top
		&& other.top < this.bottom;

	const overlapsTopRight = this.left >= other.left
		&& this.left < other.right
		&& other.top >= this.top
		&& other.top < this.bottom;

	const overlapsBottomLeft = other.left >= this.left
		&& other.left < this.right
		&& this.top >= other.top
		&& this.top < other.bottom;

	return overlapsBottomRight || overlapsTopLeft || overlapsTopRight || overlapsBottomLeft;
};

Rect.prototype.moveTo = function(x, y, w = this.w, h = this.h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
};

Object.defineProperties(Rect.prototype, {
	left: {
		get: function() {
			return this.x;
		}
	},
	right: {
		get: function() {
			return this.x + this.w;
		}
	},
	top: {
		get: function() {
			return this.y;
		}
	},
	bottom: {
		get: function() {
			return this.y + this.h;
		}
	},
	isOffscreen: {
		get: function() {
			return this.left >= Config.scene.cellCount
				|| this.right <= 0
				|| this.top >= Config.scene.cellCount
				|| this.bottom <= 0;
		}
	}
});
