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
var gameStarted = false;

//setting up timer variables to be used with several functions
var timer;
var seconds = 0;
var minutes = 0;

//setting up music
var music = new Audio('./music/music.mp3');
music.loop = true;

//setting up moves counter
var counter = 0;

/**creates table of 16 cells for gameboard
 * each cell (except 16th) contains tile div
 */
function createGameBoard(gArr) {
    const board = document.getElementById("board");
    while (board.lastChild) {
        board.removeChild(board.lastChild);
    }

    const gameSize = gArr.length;
    const nRows = Math.floor(Math.sqrt(gameSize));
    const nRowCells = nRows;
    const gTable = document.createElement("table");
    gTable.classList.add("pTable");
    const gBody = gTable.createTBody();
    gBody.classList.add("pBody");

    for (let i = 0; i < nRows; i++) {
        const gRow = gBody.insertRow();
        gRow.classList.add("pRow");

        for (let j = 0; j < nRowCells; j++) {
            const gCell = gRow.insertCell();
            gCell.classList.add("pCell");

            const tileNum = gArr[i * nRowCells + j];
            if (tileNum != 0) {
                gCell.innerHTML = '<div id="t' + tileNum + '" class="tile" style="left:' + (j * 100) + 'px; top:' + (i * 100) + 'px;" title="' + (i * nRowCells + j) + '"> <div class="tileNum">' + tileNum + '</div></div>';
            } else {
                gCell.classList.add("empty");
            }
        }
    }
    board.appendChild(gTable);
    addGameHandlers();
}

//setting up timer
function setTimer(){

    //clear any existing timer on start
    clearInterval(timer);
    seconds = 0;
    minutes = 0;

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
    
    let bestScores = getBestScores();
    let newBestTime = !bestScores.bestTime || seconds < parseInt(bestScores.bestTime);
    let newBestMoves = !bestScores.bestMoves || counter < parseInt(bestScores.bestMoves);

    if (newBestTime || newBestMoves) {
        saveBestScores(newBestTime ? seconds : bestScores.bestTime, newBestMoves ? counter : bestScores.bestMoves);
        updateBestScoresDisplay();
    }

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
//setting up moves counter
function setMoves(){
    counter++;
    document.getElementById("moves").innerText = counter;
}
//saves best time & moves to local storage
function saveBestScores(time, moves) {
    localStorage.setItem('bestTime', time);
    localStorage.setItem('bestMoves', moves);
}
//gets best time & moves from local storage
function getBestScores() {
    return {
        bestTime: localStorage.getItem('bestTime'),
        bestMoves: localStorage.getItem('bestMoves')
    };
}
//update display of scores
function updateBestScoresDisplay() {
    let bestScores = getBestScores();

    document.getElementById('bestTime').textContent = bestScores.bestTime ? bestScores.bestTime + ' seconds' : '0';
    document.getElementById('bestMoves').textContent = bestScores.bestMoves ? bestScores.bestMoves + ' moves' : '0';
}
//for testing leaderboard purposes
function clearAllLocalStorage() {
    localStorage.clear();
}

//prints current time to page from inside setTimer function
function getSeconds(){
    seconds++;
    if (seconds == 60){
        seconds = 0;
        minutes ++;
    }

    if (seconds < 10){
        document.getElementById("timer").innerText = "Time Elapsed: " + minutes + ":0" + seconds;
    } else if (seconds >= 10){
        document.getElementById("timer").innerText = "Time Elapsed: " + minutes + ":" + seconds;
    }
}

//function to stop time
function stopTimer() {
    clearInterval(timer);
}

function winNotifacation(){
    document.querySelector('.winBanner').style.display = 'block'; //changing the banner display to be revealed
    document.getElementById("winMessage").innerHTML = "Congratulations! You solved it!<br>Have a cookie!";
}

//stuff that happens when puzzle is finished
function endGame(){
    console.log("END GAME CALLED")
    stopTimer();
    winAnimation();
    let bestScores = getBestScores();
    let newBestTime = !bestScores.bestTime || seconds < bestScores.bestTime;
    let newBestMoves = !bestScores.bestMoves || counter < bestScores.bestMoves;

    if (newBestTime || newBestMoves) {
        saveBestScores(newBestTime ? seconds : bestScores.bestTime, newBestMoves ? counter : bestScores.bestMoves);
        updateBestScoresDisplay();
    }
    winNotifacation();
    
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

/** handles shuffle btn click */
function handleShuffle(){
    gameStarted = true;
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
    this.classList.add("moveAnimation");
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
    updateBestScoresDisplay();

}

/** adds event listeners on tiles for mouseover and mouseout (hover), click */
function addGameHandlers(){
    if (gameStarted){
        var tileElemArr = document.querySelectorAll(".tile");
        for(var i = 0; i < tileElemArr.length; i++){
            tileElemArr[i].addEventListener('mouseover', handleHover);
            tileElemArr[i].addEventListener('mouseout', handleHover);
            tileElemArr[i].addEventListener('click', handleClick);
        }
    }
}
