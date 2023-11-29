/** effort/time tracking notes (for self ref so i dont forget)
 * base game func - nov 25, 3pm? to 11:30pm mainly - mc
 * 
 */

/** TODO: 
 * game end behavior - homeArr is kept as constant for comparison
 * Animations
 * Game Timer w/ music - could be tied to shuffle handler
 * puzzle size options - funcs made to be flexible, so homeArr *ideally* should be the only part to be modified
 *      - consider multiple css files for each size to map image onto tiles correctly?
 * cheat - some sort w/ adjacency in mind
 * multiple tile shift - extension of neighbor check to check all tiles in row/column for empty cell
*/


/** constant array for game completion comparison
 * can be converted to accomodate other puzzle sizes, but working with 15/16 as base
 */
const homeArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
let tileArr = homeArr;  //array to be shuffled

//setting up timer variables to be used with several functions
var timer;
var seconds = 0;

//setting up music
var music = new Audio('./music/music.mp3');
music.loop = true;

//setting up moves counter
var counter = 0;

/**creates table of 16 cells for gameboard
 * each cell (except 16th) contains tile div
 */
function createGameBoard(gArr){
    //clears previous gameboard(gTable) if one exists
    board = document.getElementById("board");
    while(board.lastChild){
        board.removeChild(board.lastChild);
    }

    gameSize = gArr.length;     //might be redundant
    nRows = Math.floor(Math.sqrt(gArr.length));
    nRowCells = nRows;

    var gTable = document.createElement("table");
    gTable.classList.add("pTable");
    gBody=gTable.createTBody();
    gBody.classList.add("pBody");

    tileCtr = 0;
    tileNum = gArr[tileCtr];
    for( let i = 0; i < nRows; i++){
        gRow = gBody.insertRow();
        gRow.classList.add("pRow");
        for( let j=0; j < nRowCells;j++){
            gCell = gRow.insertCell();
            gCell.classList.add("pCell");
            if(tileNum < 16 && tileNum != 0){
                gCell.innerHTML='<div id="t' + tileNum +'" class="tile" title="' + tileCtr + '"> <div class="tileNum">' + tileNum + '</div></div>' ;
            } else if(tileNum == 0){
                gCell.classList.add("empty");
            }
            tileCtr++;
            tileNum=gArr[tileCtr];
        }
    }
    
    document.getElementById("board").appendChild(gTable);
    addGameHandlers();
    //play gameplay music
    music.play();
}

//setting up timer
function setTimer(){

    //clear any existing timer on start
    clearInterval(timer);

    seconds = 0;

    timer = setInterval(getSeconds, 1000);
}

//prints current time to page from inside setTimer function
function getSeconds(){
    seconds++;
    document.getElementById("timer").innerText = "Time Elapsed: " + seconds;
}

//function to stop time
function stopTimer() {
    clearInterval(timer);
}

function winAnimation(){
    /*TO DO*/
}

//stuff that happens when puzzle is finished
function endGame(){
    console.log("END GAME CALLED")
    stopTimer();
    winAnimation();
    
}

//checks if puzzle is solved
function checkFinish(){
    var tempTileArr = document.querySelectorAll(".tileNum"); //gets the number on each card
    for (var i = 0; i <= tempTileArr.length - 1; i++) {
        let n = i+1;

        //if number not in order, return false (not solved)
        if (parseInt(tempTileArr[i].textContent) !== n) {
          return false;
        }
      }
      return true;
  
    let seconds = 0;

    timer = setInterval(getSeconds, 1000);
}
function setMoves(){
    counter++;
    document.getElementById("moves").innerText = counter;
}
//prints current time to page from inside setTimer function
function getSeconds(){
    seconds++;
    document.getElementById("timer").innerText = seconds;

}

//function to stop time
function stopTimer() {
    clearInterval(timer);
}

function winAnimation(){
    /*TO DO*/
    
}

//stuff that happens when puzzle is finished
function endGame(){
    console.log("END GAME CALLED")
    stopTimer();
    winAnimation();
    
}

//checks if puzzle is solved
function checkFinish(){
    var tempTileArr = document.querySelectorAll(".tileNum"); //gets the number on each card
    for (var i = 0; i <= tempTileArr.length - 1; i++) {
        let n = i+1;

        //if number not in order, return false (not solved)
        if (parseInt(tempTileArr[i].textContent) !== n) {
          return false;
        }
      }
      return true;
}
//checks for first shuffle
let firstShuffle = false;
/** handles shuffle btn click */
function handleShuffle(){
    tileArr = shuffle(tileArr);
	tileArr = makePuzzleSolvable(tileArr);
    createGameBoard(tileArr);
    setTimer();

    //only play music on first shuffle
    if (!firstShuffle) {
        music.play();
        setTimer();
        firstShuffle = true;
    }

    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.classList.add('shaking');
    });

    setTimeout(() => {
        tiles.forEach(tile => {
            tile.classList.remove('shaking');
        });
    }, 800);
}
/** shuffles given array and returns shuffled array */
function shuffle(gArr){
    var currIndex = gArr.length, tmpVal, rndIndex;

    while(currIndex !== 0){
        rndIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;
        tmpVal = gArr[currIndex];
        gArr[currIndex] = gArr[rndIndex];
        gArr[rndIndex] = tmpVal;
    }
    return gArr;
}
//counts the number of inversions in the shuffled array
function countInversions(gArr) {
    var inversions = 0;
    for (var i = 0; i < gArr.length - 1; i++) {
        for (var j = i + 1; j < gArr.length; j++) {
            if (gArr[i] > gArr[j] && gArr[i] !== -1 && gArr[j] !== -1) {
                inversions++;
            }
        }
    }
    return inversions;
}

//checks if the puzzle is solvable or unsolvable
function isPuzzleSolvable(gArr) {
	//counts inversions
    var inversions = countInversions(gArr);
	//calculates width 3x3, 4x4, etc
    var width = Math.sqrt(gArr.length);
	//finds index of emtpy tile
    var emptyTileIndex = gArr.indexOf(-1);

    // Determine row number from the bottom
    var rowNumber = Math.floor((gArr.length - emptyTileIndex - 1) / width) + 1;

    if (width % 2 !== 0) {
        // Odd width puzzle
        return inversions % 2 === 0;
    } else {
        // Even width puzzle
        if (rowNumber % 2 === 0) {
            // Empty tile in an even row from the bottom
            return inversions % 2 !== 0;
        } else {
            // Empty tile in an odd row from the bottom
            return inversions % 2 === 0;
        }
    }
}

//If shuffled puzzle is unsolvable it changes the first two elements to make it solvable
function makePuzzleSolvable(gArr) {
    while (!isPuzzleSolvable(gArr)) {
        // Swap the first two elements to change the number of inversions
        var tmpVal = gArr[0];
        gArr[0] = gArr[1];
        gArr[1] = tmpVal;
    }
	return gArr;

    // The modified array is now solvable
}


/**identifies movable tile and toggles class for css */
function handleHover(){
    currIndex=parseInt(this.title);
    
    var nRowCells = Math.sqrt(tileArr.length); console.log("cells per row: " + nRowCells);

    /** checks each neighbor
     * TODO: merge with findEmptyNeighbor func if possible
     */
    emptyNeighbor = false; console.log("init val " +emptyNeighbor);
    if((currIndex + 1) % nRowCells != 1){   //if not on left side
        console.log("checking left " + currIndex);
        if(tileArr[currIndex-1] == 0){
            emptyNeighbor = true;
            console.log("left empty");
        }
    }
    if((currIndex + 1) % nRowCells != 0){   //if not on right side
        console.log("checking right " + (currIndex + 1));
        if(tileArr[currIndex + 1] == 0){
            emptyNeighbor = true;
            console.log("right empty");
        }
    }
    if((currIndex + 1) - nRowCells > 0){    //if not on top row
        console.log("checking top");
        if(tileArr[currIndex - nRowCells] == 0){
            emptyNeighbor = true;
            console.log("top empty");
        }
    }
    if((currIndex + 1) + nRowCells <= 16){  //if not on bottom row
        console.log("checking bot");
        if(tileArr[currIndex + nRowCells] == 0){
            emptyNeighbor = true;
            console.log("bottom empty " + emptyNeighbor);
        }
    }
    if(emptyNeighbor == true){this.classList.toggle("movablePiece")};
}

/**moves tile to empty space */
function handleClick(){
    this.classList.remove("movablePiece");

    currIndex=parseInt(this.title);
    emptyNeighborIndex = findEmptyNeighbor(currIndex); console.log(emptyNeighborIndex);
    if(emptyNeighborIndex != -1){
        tileArr[emptyNeighborIndex] = tileArr[currIndex];
        tileArr[currIndex] = 0;
        //console.log(this.parentNode);
        currParentNode = this.parentNode;
        targetParentNode = document.getElementsByClassName("empty")[0];
        targetParentNode.classList.remove("empty");
        currParentNode.classList.add("empty");
        currParentNode.removeChild(this);
        targetParentNode.appendChild(this);
        this.title = emptyNeighborIndex;
        targetParentNode.title = currIndex;
        setMoves();
        if (checkFinish()){
            endGame();
        }
    }
}

/**returns index of empty neighbor if one is found, else returns -1 */
function findEmptyNeighbor(currIndex){
    var nRowCells = Math.sqrt(tileArr.length);

    /** checks each neighbor */
    if((currIndex + 1) % nRowCells != 1){   //if not on left side
        console.log("checking left " + currIndex);
        if(tileArr[currIndex-1] == 0){
            console.log("left empty");
            return currIndex - 1;
        }
    }
    if((currIndex + 1) % nRowCells != 0){   //if not on right side
        console.log("checking right " + (currIndex + 1));
        if(tileArr[currIndex + 1] == 0){
            console.log("right empty");
            return currIndex + 1;
        }
    }
    if((currIndex + 1) - nRowCells > 0){    //if not on top row
        console.log("checking top");
        if(tileArr[currIndex - nRowCells] == 0){
            console.log("top empty");
            return currIndex - nRowCells;
        }
    }
    if((currIndex + 1) + nRowCells <= 16){  //if not on bottom row
        console.log("checking bot");
        if(tileArr[currIndex + nRowCells] == 0){
            console.log("bottom empty ");
            return currIndex + nRowCells;
        }
    }
    return -1;  //-1 = no empty neighbor
}

window.onload=function(){
    createGameBoard(tileArr);   //initializes board on load in correct order; TODO: lock board before game start
}

/** adds event listeners on tiles for mouseover and mouseout (hover), click */
function addGameHandlers(){
    var tileElemArr = document.querySelectorAll(".tile");
    for(var i = 0; i < tileElemArr.length; i++){
        tileElemArr[i].addEventListener('mouseover', handleHover);
        tileElemArr[i].addEventListener('mouseout', handleHover);
        tileElemArr[i].addEventListener('click', handleClick);
    }
}
