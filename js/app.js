// Enemies our player must avoid
var Enemy = function (posX, posY) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	this.x = posX;
	this.y = posY;
	// Give the enemy its own random initial speed
	this.spd = Math.floor(Math.random() * 150 + 80);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	// the if statement to pause movement once the player wins
	if (player.status !== "win") {
		this.x += this.spd * dt;
	}
	// Make the enemies enter the screen again
	if (this.x > 707) {
		this.x = -101;
	}
	this.hit(this);
};
Enemy.prototype.speed = function () {
	return (Math.floor(Math.random() * 150 + 80));
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Enemy hits the player
Enemy.prototype.hit = function (enemy) {
	// enemy range
	var enemyLeft = enemy.x - 80;
	var enemyRight = enemy.x + 80;
	// when player enter that range loses
	if (player.y === enemy.y && enemyLeft <= player.x && enemyRight >= player.x) {
		player.reset();
	}
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Player class
var Player = function () {
		this.sprite = 'images/char-horn-girl.png';
		this.x = 303;
		this.y = 400;
		this.status = "play";
	};
	// update() method
Player.prototype.update = function () {
	// Show player win message
	if (this.y < 50) {
		$("#win").addClass("display-block");
		this.status = "win";
	}
};
// render() method
Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// hnadleInput() method
Player.prototype.handleInput = function (keyInput) {
	var stepV = 85;
	var stepH = 101;
	// move right
	if (keyInput === 'right') {
		// check for the game screen edge
		if (this.x < 600) {
			this.x += stepH;
		}
	} else if (keyInput === 'left') {
		if (this.x > 90) {
			this.x -= stepH;
		}
	} else if (keyInput === 'up') {
		if (this.y > 40) {
			this.y -= stepV;
		}
	} else if (keyInput === 'down') {
		if (this.y < 350) {
			this.y += stepV;
		}
	}
};
// reset()
Player.prototype.reset = function () {
	this.x = 303;
	this.y = 400;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i = 0; i < 3; i++) {
	// Create a bug enemy with a random speed
	var enemy = new Enemy((i * 100), (i * 85 + 60));
	allEnemies.push(enemy);
}
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	// prevent player from movements once won
	if (player.status !== "win") {
		var allowedKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		};
		player.handleInput(allowedKeys[e.keyCode]);
	}
});