const homeArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
let tileArr = homeArr;
window.onload=function(){
    createGameBoard(tileArr.length);
    document.getElementsByClassName("tile").forEach(tile =>{
        tile.addEventListener("hover"); //identify tile as movable
        tile.addEventListener("click"); //move tile on click
    }); 
}

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
                gCell.innerHTML='<div id="t' + tileNum +'" class="tile" value="' + tileNum + '"> <div class="tileNum">' + tileNum + '</div></div>' ;
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