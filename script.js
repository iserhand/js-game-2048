'use strict';
const cvs = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cellSize = 100;
let score = 0;
ctx.lineWidth = 12;
ctx.strokeStyle = '#bbada0';
ctx.font = "30px Arial";
const colors = ['#eee4da', '#eee1c9', '#f3b27a',
	'#f69664', '#f77c5f', '#f75f3b',
	'#edd073', '#edcc62', '#edc950',
	'#edc53f', '#edc22e'
];
var cellElements = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];

function isGameOver() {
	let flag = true;
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (cellElements[i][j] == 0) {
				flag = false;
				return flag;
			} else {
				if (i < 3 && cellElements[i][j] == cellElements[i + 1][j]) {
					flag = false;
					return flag;
				}
				if (j < 3 && cellElements[i][j] == cellElements[i][j + 1]) {
					flag = false;
					return flag;
				}
			}
		}
	}
	if (flag) {
		if (!alert('Game over! Try again')) {
			window.location.reload();
		}
	}
}

function createCellBlock(count) {
	while (count > 0) {
		if (Math.floor(Math.random() * 10) == 10) {
			while (true) {
				let tempx = Math.floor(Math.random() * 4);
				let tempy = Math.floor(Math.random() * 4);
				if (cellElements[tempx][tempy] == 0) {
					cellElements[tempx][tempy] = 4;
					break;
				}
			}
		} else {
			while (true) {
				let tempx = Math.floor(Math.random() * 4);
				let tempy = Math.floor(Math.random() * 4);

				if (cellElements[tempx][tempy] == 0) {
					cellElements[tempx][tempy] = 2;
					break;
				}
			}
		}
		count--
	}
}

function drawCells(x, y) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let j = 0; j < 4; j++) {
		for (let i = 0; i < 4; i++) {
			if (cellElements[j][i] != 0) {
				ctx.fillStyle = colors[Math.log2(cellElements[j][i]) - 1];
				ctx.fillRect(i * cellSize + 19, j * cellSize + 19, cellSize - 10, cellSize - 10);
				ctx.fillStyle = 'black'
				ctx.fillText(cellElements[j][i], i * cellSize + 55 - cellElements[j][i] / 10, j * cellSize + 70);
			}
			ctx.strokeRect(j * cellSize + 15, i * cellSize + 15, cellSize, cellSize);
		}
	}
	drawScoreBoard();
	isGameOver();
	return 0;
}

function drawScoreBoard() {
	if (localStorage.getItem("hs") == null)
		localStorage.setItem("hs", 0);
	let hScore = localStorage.getItem("hs");
	if (score >= hScore)
		localStorage.setItem("hs", score);
	ctx.clearRect(20, 500, canvas.width, canvas.height);
	ctx.fillText("Score :" + score, 20, 500);
	ctx.fillText("Highest Score :" + hScore, 20, 550);
}
/*
Rule 1: if 2 items can combine 
in the direction of movement
its legal.
OR Rule 2: if at least one item can move in 
that direction its. legal
One of those rules must be true to make the move.
Then after the move a new block is created at a
empty spot.
*/
function moveUp() {
	let flag = false;

	function slideUp() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (cellElements[i][j] == 0 && i != 3) {
					for (let k = i; k < 4; k++) {
						if (cellElements[k][j] != 0) {
							cellElements[i][j] = cellElements[k][j];
							cellElements[k][j] = 0;
							flag = true;
							break;
						}
					}
				}
			}
		}
	}

	function mergeUp() {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 4; j++) {
				if (cellElements[i][j] != 0 && cellElements[i][j] == cellElements[i + 1][j]) {
					cellElements[i][j] *= 2;
					score += cellElements[i][j];
					cellElements[i + 1][j] = 0;
					flag = true;
					slideUp();
					drawScoreBoard();
				}
			}
		}
	}
	slideUp();
	mergeUp();
	if (flag) {
		createCellBlock(1);
		drawCells();
	}

}

function moveDown() {
	let flag = false;

	function slideDown() {
		for (let i = 3; i >= 0; i--) {
			for (let j = 3; j >= 0; j--) {
				if (cellElements[i][j] == 0 && i != 0) {
					for (let k = i; k >= 0; k--) {
						if (cellElements[k][j] != 0) {
							cellElements[i][j] = cellElements[k][j];
							cellElements[k][j] = 0;
							flag = true;
							break;
						}
					}
				}
			}
		}
	}

	function mergeDown() {
		for (let i = 3; i > 0; i--) {
			for (let j = 3; j >= 0; j--) {
				if (cellElements[i][j] != 0 && cellElements[i][j] == cellElements[i - 1][j]) {
					cellElements[i][j] *= 2;
					score += cellElements[i][j];
					cellElements[i - 1][j] = 0;
					flag = true;
					slideDown();
				}
			}
		}
	}
	slideDown();
	mergeDown();
	if (flag) {
		createCellBlock(1);
		drawCells();
	}

}

function moveLeft() {
	let flag = false;

	function slideLeft() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (cellElements[i][j] == 0 && j != 3) {
					for (let k = j; k < 4; k++) {
						if (cellElements[i][k] != 0) {
							cellElements[i][j] = cellElements[i][k];
							cellElements[i][k] = 0;
							flag = true;
							break;
						}
					}
				}
			}
		}
	}

	function mergeLeft() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 3; j++) {
				if (cellElements[i][j] != 0 && cellElements[i][j] == cellElements[i][j + 1]) {
					cellElements[i][j] *= 2;
					score += cellElements[i][j];
					cellElements[i][j + 1] = 0;
					flag = true;
					slideLeft();
					drawScoreBoard();
				}
			}
		}
	}
	slideLeft();
	mergeLeft();
	if (flag) {
		createCellBlock(1);
		drawCells();
	}


}

function moveRight() {
	let flag = false;

	function slideRight() {
		for (let i = 3; i >= 0; i--) {
			for (let j = 3; j >= 0; j--) {
				if (cellElements[i][j] == 0 && j != 0) {
					for (let k = j; k >= 0; k--) {
						if (cellElements[i][k] != 0) {
							cellElements[i][j] = cellElements[i][k];
							cellElements[i][k] = 0;
							flag = true;
							break;
						}
					}
				}
			}
		}
	}

	function mergeRight() {
		for (let i = 3; i > 0; i--) {
			for (let j = 3; j >= 0; j--) {
				if (cellElements[i][j] != 0 && cellElements[i][j] == cellElements[i][j - 1]) {
					cellElements[i][j] *= 2;
					score += cellElements[i][j];
					cellElements[i][j - 1] = 0;
					flag = true;
					slideRight();
					drawScoreBoard();
				}
			}
		}
	}
	slideRight();
	mergeRight();
	if (flag) {
		createCellBlock(1);
		drawCells();
	}


}
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 38) moveUp();
	else if (event.keyCode == 40) moveDown();
	else if (event.keyCode == 37) moveLeft();
	else if (event.keyCode == 39) moveRight();;
});
createCellBlock(2);
drawCells(0, 0);