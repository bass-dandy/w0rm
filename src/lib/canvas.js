import Config from '../config.js';

export default function Canvas(canvas) {
	this.canvas = canvas;
}

Canvas.prototype.toCanvas = function(gridUnits) {
	const gridToCanvas = this.canvas.clientWidth / Config.scene.cellCount;
	return gridUnits * gridToCanvas;
};

Canvas.prototype.drawRect = function(color, x, y, w, h) {
	const ctx = this.canvas.getContext('2d');

	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(this.toCanvas(x), this.toCanvas(y), this.toCanvas(w), this.toCanvas(h));
	ctx.restore();
};

Canvas.prototype.drawImage = function(src, x, y, w, h) {
	const sprite = new Image();
	sprite.src = src;

	this.canvas.getContext('2d').drawImage(
		sprite,
		this.toCanvas(x),
		this.toCanvas(y),
		this.toCanvas(w),
		this.toCanvas(h)
	);
},

Canvas.prototype.drawText = function(text, x, y, opts = {}) {
	const ctx = this.canvas.getContext('2d');

	ctx.save();
	Object.keys(opts).forEach((key) => {
		ctx[key] = opts[key];
	});
	ctx.fillText(text, this.toCanvas(x), this.toCanvas(y));
	ctx.restore();
};

Canvas.prototype.clear = function() {
	const ctx = this.canvas.getContext('2d');
	ctx.fillStyle = Config.scene.color;
	ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
};
