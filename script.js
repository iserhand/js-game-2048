'use strict';
const cvs = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cellSize = 100;
ctx.lineWidth = 15;
ctx.font = "30px Arial";
let counter = 0;
let cellElements = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];

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
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			ctx.strokeRect(i * cellSize + 15, j * cellSize + 15, cellSize, cellSize);
			ctx.fillText(cellElements[i][j], i * cellSize + 55, j * cellSize + 70);
			counter++;
		}
	}
	return 0;
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
	let flag=false;
	//Rule 1
	//Combine the elements.
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			if (cellElements[i][j]==cellElements[i+1][j]){
				cellElements[i][j]*=2;
				cellElements[i+1][j]=0;
				console.log("flag");
				flag=true;
			}
		}
	}
	//Rule 2 move elements to topmost available cell.
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			if(cellElements[j][i]==0){
				for(let k=i;k<3;k++){
					if(cellElements[j][k]!=0){
						flag=true;
						cellElements[j][i]=cellElements[j][k];
						cellElements[j][i]=0;
						break;
					}
				}
			}
		}
	}
	if(flag){
		console.log("yaptıkbişeyler");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		drawCells();
	}
}

function moveDown() {


}

function moveLeft() {

}

function moveRight() {

}
createCellBlock(2);
drawCells(0, 0);
moveUp();
