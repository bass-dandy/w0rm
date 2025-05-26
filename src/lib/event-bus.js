export default function EventBus() {
	this.events = {};
};

EventBus.prototype.on = function(eventName, cb) {
	if (!this.events.hasOwnProperty(eventName)) {
		this.events[eventName] = [];
	}
	this.events[eventName].push(cb);
};

EventBus.prototype.emit = function(eventName, ...args) {
	if (Array.isArray(this.events[eventName])) {
		this.events[eventName].forEach((cb) => cb(...args));
	}
};

EventBus.prototype.clear = function() {
	this.events = {};
};
