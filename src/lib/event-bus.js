export default {
	events: {},

	on(eventName, cb) {
		if (!this.events.hasOwnProperty(eventName)) {
			this.events[eventName] = [];
		}
		this.events[eventName].push(cb);
	},

	emit(eventName, ...args) {
		if (Array.isArray(this.events[eventName])) {
			this.events[eventName].forEach((cb) => cb(...args));
		}
	},

	clear() {
		this.events = {};
	}
};
