window.onload=function(){
    createGameBoard(16);
    function setTimer(){
        /** copy func */
    }
}

function createGameBoard(cellCount){
    /**copy func */
    gameSize = cellCount;
    nRows = Math.floor(Math.sqrt(cellCount));
    nRowCells = nRows;
        
    var gTable = document.createElement("table");
    gTable.classList.add("pTable");
    gBody=gTable.createTBody();
    gBody.classList.add("pBody");
    tileNum = 1;
    for( let i = 0; i < nRows; i++){
        gRow = gBody.insertRow();
        gRow.classList.add("pRow");
        for( let j=0; j < nRowCells;j++){
            gCell = gRow.insertCell();
            gCell.classList.add("pCell");
            if(tileNum < 16){
                gCell.innerHTML='<div id="t' + tileNum +'" class="tile"> <div class="tileNum">' + tileNum + '</div></div>' ;
            }
            tileNum++;
        }
    }
    document.getElementById("board").appendChild(gTable);
}
