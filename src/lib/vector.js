export default function Vector(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}

Vector.prototype.getPositivePerpendicular = function() {
	if (this.x === 0 && this.y !== 0) {
		return new Vector(1, 0);
	} else if (this.x !== 0 && this.y === 0) {
		return new Vector(0, 1);
	}
};

Vector.prototype.equals = function(other) {
	return this.x === other.x && this.y === other.y;
};

Vector.prototype.add = function(other) {
	const newVector = new Vector(this.x, this.y);

	if (other.x !== undefined && other.y !== undefined) {
		newVector.x += other.x;
		newVector.y += other.y;
	} else if (typeof other === 'number') {
		newVector.x += other;
		newVector.y += other;
	}
	return newVector;
};

Vector.prototype.multiply = function(other) {
	const newVector = new Vector(this.x, this.y);

	if (other.x !== undefined && other.y !== undefined) {
		newVector.x *= other.x;
		newVector.y *= other.y;
	} else if (typeof other === 'number') {
		newVector.x *= other;
		newVector.y *= other;
	}
	return newVector;
};
