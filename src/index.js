import Bullet from './actors/bullet';
import Food from './actors/food';
import Portal from './actors/portal';
import Worm from './actors/worm';
import Config from './config';
import EventBus from './lib/event-bus';
import Vector from './lib/vector';
import {directions, events} from './lib/constants';
import Canvas from './lib/canvas';

const SCREENS = {
	GAME: 'game',
	PAUSE: 'pause',
	TITLE: 'title'
};

export default function Game(canvas) {
	// bind public methods
	this.play = this.play.bind(this);
	this.pause = this.pause.bind(this);
	this.up = this.up.bind(this);
	this.right = this.right.bind(this);
	this.down = this.down.bind(this);
	this.left = this.left.bind(this);
	this.fire1 = this.fire1.bind(this);
	this.fire2 = this.fire2.bind(this);
	this.end = this.end.bind(this);

	Canvas.load(canvas);
	this.state = this.createNewGameState();
	EventBus.on(events.FOOD_EATEN, () => { this.state.score += 10; });
	EventBus.on(events.WORM_DEAD, () => { this.state = this.createNewGameState(); });

	// bind handlePlayerInput here so we can remove the event listener later
	this.handlePlayerInput = this.handlePlayerInput.bind(this);
	window.addEventListener('keydown', this.handlePlayerInput);

	this.doGameLoop();
}

Game.prototype.createNewGameState = function() {
	const portal1 = this.randomizePortal(Config.portal.color1);
	let portal2 = this.randomizePortal(Config.portal.color2);

	while (portal1.bounds.overlaps(portal2.bounds)) {
		portal2 = this.randomizePortal(Config.portal.color2);
	}

	return {
		actors: {
			worm: new Worm(),
			bullets: [],
			portal1,
			portal2,
			food: new Food()
		},
		score: 0,
		shouldTween: false,
		lastUpdateTs: 0,
		activeScreen: SCREENS.TITLE
	};
};

Game.prototype.randomizePortal = function(color) {
	const dirs = [directions.UP, directions.RIGHT, directions.DOWN, directions.LEFT];
	const dir = dirs[Math.floor(Math.random() * 4)];

	const portalWidth = 2 * Config.portal.radius + 1;
	const offset = Math.floor(
		Math.random() * (Config.scene.cellCount - portalWidth)
	);

	const oneUnitFromFarEdge = Config.scene.cellCount - 1;
	let pos;

	if (dir === directions.UP) {
		pos = new Vector(offset, oneUnitFromFarEdge);
	} else if (dir === directions.RIGHT) {
		pos = new Vector(0, offset);
	} else if (dir === directions.DOWN) {
		pos = new Vector(offset, 0);
	} else if (dir === directions.LEFT) {
		pos = new Vector(oneUnitFromFarEdge, offset);
	}

	return new Portal(pos, dir, color);
};

Game.prototype.doCollisions = function() {
	const {worm, bullets, food, portal1, portal2} = this.state.actors;

	if (worm.isColliding(food)) {
		EventBus.emit(events.FOOD_EATEN);
	}

	if (worm.isColliding(portal1) && worm.dir.equals(portal1.dir.multiply(-1))) {
		worm.teleport(portal1, portal2);
	} else if (worm.isColliding(portal2) && worm.dir.equals(portal2.dir.multiply(-1))) {
		worm.teleport(portal2, portal1);
	}

	// remove offscreen bullets
	this.state.actors.bullets = bullets.reduce((acc, bullet) => {
		if (!bullet.shouldRemove) {
			acc.push(bullet);
		}
		return acc;
	}, []);
};

Game.prototype.update = function() {
	for (const actorKey in this.state.actors) {
		const actor = this.state.actors[actorKey];
		if (Array.isArray(actor)) {
			actor.forEach((e) => e.update());
		} else {
			actor.update();
		}
	}
	this.state.shouldTween = !this.state.shouldTween;
};

Game.prototype.renderGame = function() {
	Canvas.clear();

	for (const actorKey in this.state.actors) {
		const actor = this.state.actors[actorKey];
		if (Array.isArray(actor)) {
			actor.forEach((e) => e.draw());
		} else {
			actor.draw();
		}
	}

	Canvas.drawText(`Score: ${this.state.score}`, 0, 0, {
		font: `${Config.font.size} ${Config.font.family}`,
		fillStyle: Config.font.color,
		textBaseline: 'hanging'
	});
};

Game.prototype.renderPause = function() {
	Canvas.clear();
	const gridMiddle = Math.floor(Config.scene.cellCount / 2);

	Canvas.drawText('Paused', gridMiddle, gridMiddle, {
		font: `${Config.font.size} ${Config.font.family}`,
		fillStyle: Config.font.color,
		textBaseline: 'middle',
		textAlign: 'center'
	});
};

Game.prototype.renderTitle = function() {
	Canvas.clear();
	const gridMiddle = Math.floor(Config.scene.cellCount / 2);

	Canvas.drawImage(Config.titleScreen.src, 0, 0, Config.scene.cellCount, Config.scene.cellCount);

	Canvas.drawText('Press any key to begin', gridMiddle, Config.scene.cellCount, {
		font: `${Config.font.size} ${Config.font.family}`,
		fillStyle: Config.font.color,
		textBaseline: 'bottom',
		textAlign: 'center'
	});
};

Game.prototype.doGameLoop = function(frameTs = 0) {
	if (!Canvas.isLoaded) {
		return;
	}

	if (this.state.activeScreen === SCREENS.PAUSE) {
		this.renderPause();
	} else if (this.state.activeScreen === SCREENS.TITLE) {
		this.renderTitle();
	} else if (this.state.activeScreen === SCREENS.GAME) {
		if (frameTs - this.state.lastUpdateTs >= Config.scene.updateStep) {
			this.update();
			this.doCollisions();
			this.renderGame();
			this.state.lastUpdateTs = frameTs;
		}
	}
	window.requestAnimationFrame((frameTs) => this.doGameLoop(frameTs));
};

Game.prototype.handlePlayerInput = function(e) {
	switch (e.keyCode) {
		case Config.controls.pause:
			this.pause();
			break;
		case Config.controls.left:
			this.left();
			break;
		case Config.controls.up:
			this.up();
			break;
		case Config.controls.right:
			this.right();
			break;
		case Config.controls.down:
			this.down();
			break;
		case Config.controls.fire1:
			this.fire1();
			break;
		case Config.controls.fire2:
			this.fire2();
			break;
		default:
			this.play();
			break;
	}
};

// ----------------------------------
// Public methods for a Game instance
// ----------------------------------

// note that play() is called by every control input function
// this is because every control input should also unpause or begin the game
Game.prototype.play = function() {
	if (this.state.activeScreen === SCREENS.TITLE || this.state.activeScreen === SCREENS.PAUSE) {
		this.state.activeScreen = SCREENS.GAME;
	}
};

Game.prototype.pause = function() {
	if (this.state.activeScreen === SCREENS.GAME) {
		this.state.activeScreen = SCREENS.PAUSE;
	} else {
		this.play();
	}
};

Game.prototype.up = function() {
	this.play();
	this.state.actors.worm.setDir(directions.UP);
};

Game.prototype.right = function() {
	this.play();
	this.state.actors.worm.setDir(directions.RIGHT);
};

Game.prototype.down = function() {
	this.play();
	this.state.actors.worm.setDir(directions.DOWN);
};

Game.prototype.left = function() {
	this.play();
	this.state.actors.worm.setDir(directions.LEFT);
};

Game.prototype.fire1 = function() {
	this.play();

	const {worm, bullets} = this.state.actors;
	if (worm.canShoot) {
		bullets.push(
			new Bullet(worm.head.pos, worm.dir, Config.portal.color1)
		);
	}
};

Game.prototype.fire2 = function() {
	this.play();

	const {worm, bullets} = this.state.actors;
	if (worm.canShoot) {
		bullets.push(
			new Bullet(worm.head.pos, worm.dir, Config.portal.color2)
		);
	}
};

Game.prototype.end = function() {
	window.removeEventListener('keydown', this.handlePlayerInput);
	EventBus.clear();
	Canvas.unload();
};
