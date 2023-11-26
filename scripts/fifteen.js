/** constant array for game completion comparison
 * can be converted to accomodate other puzzle sizes, but working with 15/16 as base
 */
const homeArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
let tileArr = homeArr;  //array to be shuffled

/**creates table of 16 cells for gameboard
 * each cell (except 16th) contains tile div
 */
function createGameBoard(cellCount){
    gameSize = cellCount;
    nRows = Math.floor(Math.sqrt(cellCount));
    nRowCells = nRows;

    var gTable = document.createElement("table");
    gTable.classList.add("pTable");
    gBody=gTable.createTBody();
    gBody.classList.add("pBody");

    tileCtr = 0;
    tileNum = tileArr[tileCtr];
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
            tileNum=tileArr[tileCtr];
        }
    }
    
    document.getElementById("board").appendChild(gTable);
}

function setTimer(){
    /** copy func */
}

/** shuffles given array and returns shuffled array */
function shuffle(arr){
    var currIndex = arr.length, tmpVal, rndIndex;

    while(currIndex !== 0){
        rndIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;
        tmpVal = arr[currIndex];
        arr[currIndex] = arr[rndIndex];
        arr[rndIndex] = tmpVal;
    }
    return arr;
}

/**identifies movable tile */
function handleHover(){
    currIndex=parseInt(this.title);
    //currIndex = tileArr.indexOf[tileNum]; console.log(currIndex);
    
    var nRowCells = Math.sqrt(tileArr.length); console.log("cells per row: " + nRowCells);

    /** checks each neighbor */
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
    tileArr[emptyNeighborIndex] = tileArr[currIndex];
    tileArr[currIndex] = 0;
    //console.log(this.parentNode);
    currParentNode = this.parentNode;
    targetParentNode = document.getElementsByClassName("empty")[0];
    targetParentNode.classList.remove("empty");
    currParentNode.classList.add("empty");
    currParentNode.removeChild(this);
    targetParentNode.appendChild(this);
}

/**returns index of empty neighbor if one is found */
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
    return -1;
}

window.onload=function(){
    createGameBoard(tileArr.length);
    // document.querySelectorAll("tile").forEach(tile =>{
    //     tile.addEventListener("hover", handleHover()); //identify tile as movable
    //     tile.addEventListener("click", handleClick()); //move tile on click
    // }); 
    var tileElemArr = document.querySelectorAll(".tile");
    //var tileElemArr = [...tileElements];
    for(var i = 0; i < tileElemArr.length; i++){
        tileElemArr[i].addEventListener('mouseover', handleHover);
        tileElemArr[i].addEventListener('mouseout', handleHover);
        tileElemArr[i].addEventListener('click', handleClick);
    }
}