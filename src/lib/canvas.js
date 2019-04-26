import Config from '../config';

let Canvas = null;

export default {
	get isLoaded() {
		return !!Canvas;
	},

	get context() {
		return Canvas.getContext('2d');
	},

	load(canvas) {
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		Canvas = canvas;
	},

	toCanvas(gridUnits) {
		const gridToCanvas = Canvas.clientWidth / Config.scene.cellCount;
		return gridUnits * gridToCanvas;
	},

	drawRect(color, x, y, w, h) {
		this.context.save();
		this.context.fillStyle = color;
		this.context.fillRect(this.toCanvas(x), this.toCanvas(y), this.toCanvas(w), this.toCanvas(h));
		this.context.restore();
	},

	drawImage(src, x, y, w, h) {
		const sprite = new Image();
		sprite.src = src;
		this.context.drawImage(sprite, this.toCanvas(x), this.toCanvas(y), this.toCanvas(w), this.toCanvas(h));
	},

	drawText(text, x, y, opts = {}) {
		this.context.save();
		Object.keys(opts).forEach((key) => {
			this.context[key] = opts[key];
		});
		this.context.fillText(text, this.toCanvas(x), this.toCanvas(y));
		this.context.restore();
	},

	clear() {
		this.context.fillStyle = Config.scene.color;
		this.context.fillRect(0, 0, Canvas.clientWidth, Canvas.clientHeight);
	},

	unload() {
		Canvas = null;
	}
};
