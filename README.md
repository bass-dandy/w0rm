Usage:
```javascript
import Worm from '@bass_dandy/w0rm';

// create game state and load into canvas
const game = new Worm(
	canvas, // *required* a <canvas> DOM element
	(score: number) => {...} // *optional* a callback executed on each score update
);

// add event listeners for default keyboard controls
game.enableKeyboardControls();

// remove event listeners for default keyboard controls
game.disableKeyboardControls();

// remove event listeners for default keyboard controls, clear game state, unload canvas
game.end();
```

If you would like to use alternate controls, game instances expose methods for direct control:
```javascript
// control pause state
game.play();
game.pause();

// move the worm in a direction
game.up();
game.right();
game.left();
game.down();

// shoot portals
game.fire1();
game.fire2();
```
