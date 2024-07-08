const User=(name)=>{
    
    let score=0;
   
    return{name,get score(){return score}, increment:function(){
        score++;
      }};
};



let user1;
let user2, Player1, Player2;
let start=document.querySelector('.Start');
let dialog=document.querySelector('.dialog');
let winner;

start.addEventListener('click',()=>{
    start.disabled=true;
    dialog.showModal();
    
})
let submit=document.querySelector('.submit');
submit.addEventListener('click', ()=>{
    user1=document.getElementById('username1').value;
    user2=document.getElementById('username2').value;
    console.log(user1);
    Player1=User(user1);
    Player2=User(user2);

    winner=GameBoard.PlayGame();
    dialog.close();
    
})





let boadCcontainer=document.querySelector('.board-container');
const GameBoard= (()=>{
    const rows=3;
    const columns=3;
    const board=[];
    let rounds=0;
    let w;
    let dali=0;
    let p = document.createElement('p');
    let displayWinner = function(winner,winnercells) {
        
        if (winner === 'X') {
            
           Player1.increment();
        } else if (winner === '0') {
           
            Player2.increment();
        } else if (winner === 'Draw') {
          alert("Game is Drawn :|") 
        }
        p.textContent=`Score is ${Player1.name}  ${Player1.score} :   ${Player2.score}   ${Player2.name}`
        
        if(winnercells){
            winnercells.forEach(([i,j])=>{
                console.log(`Processing cell at [${i},${j}]`);
               let cell= document.querySelector(`[data-row-index="${i}"] [data-cell-index="${j}"]`);
               if(cell){
                cell.classList.add('hit');
               }
            })
        }
        
        // Disable all cells after the game is over
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.disabled = true);
    }
    boadCcontainer.appendChild(p);

    let resetboard=function(){

        for(let i=0;i<rows;i++){
            for(let j=0;j<columns;j++){
                board[i][j]='';
            }
        }
         dali=0;
         winner='nikoj';
         rounds=0;


    }
    let PlayGame=function(){
    
    for(let i=0;i<rows;i++)
        {
            
            let row=document.createElement('div');
            board[i]=[];
            row.classList.add('row');

            row.setAttribute('data-row-index',i);
            for(let j=0;j<columns;j++)
            {
                let cell=document.createElement('button');
                cell.classList.add('cell');

                cell.addEventListener('click',()=>{
                    rounds++;
                    if(dali==0){
                        cell.textContent='X';
                        cell.disabled=true;
                        board[i][j]='X';
                        dali=1;
                        w=checkWinner();
                     
                    }
                    else{
                        cell.textContent='0';
                        cell.disabled=true;
                        board[i][j]='0';
                        dali=0;
                        w=checkWinner();
                     
                    }
                    w = checkWinner();
                    if (w.winner === 'X' || w.winner === '0') {
                        displayWinner(w.winner,w.winnercells);
                    }
                    else if(rounds==9){
                        displayWinner("Draw",0);
                    }
                })


                cell.setAttribute('data-cell-index',j);
                board[i][j]='';
                row.appendChild(cell);
            }
            boadCcontainer.appendChild(row);
            
            
        }
       
        
    }
    
    let checkWinner=function(){
        let counterxG=0;
        let counter0G=0;

        let counterXS=0;
        let counter0S=0;
        let winner='nikoj';
        let winnercells=[];
        for(let i=0;i<rows;i++)
        {
            for(let j=0;j<columns;j++)
            {
                if(i==0)
                {
                    if(board[i][j]=='X' && board[i+1][j]=='X' && board[i+2][j]=='X')
                    {
                        winner='X';
                        winnercells=[[i,j],[i+1,j],[i+2,j]];
                    }
                    else if(board[i][j]=='0' && board[i+1][j]=='0' && board[i+2][j]=='0')
                    {
                        winner='0';
                        winnercells=[[i,j],[i+1,j],[i+2,j]];

                    }
                }
                if(board[i][j]=='X' && board[i][j+1]=='X' && board[i][j+2]=='X'){
                    winner='X';
                    winnercells=[[i,j],[i,j+1],[i,j+2]];
                }
                else if(board[i][j]=='0' && board[i][j+1]=='0' && board[i][j+2]=='0')
                {
                    winner='0';
                    winnercells=[[i,j],[i,j+1],[i,j+2]];
                }
                else if(i==j && i!=0 && j!=columns-1){
                    if(board[i][j]=='X'){
                        counterxG++;
                        counterXS++;
                        
                    }
                    else if(board[i][j]=='0'){
                        counter0G++;
                        counter0S++;
                    }
                }
                else if(i==j){
                    if(board[i][j]=='X'){
                        counterxG++;
                        
                        
                    }
                    else if(board[i][j]=='0'){
                        counter0G++;
                        
                    }
                }
                else if(i+j==rows-1 ){
                    if(board[i][j]=='X'){
                        counterXS++;
                    }
                    else if(board[i][j]=='0'){
                        counter0S++;
                    }
                }

            }
            if(winner=='X' || winner=='0'){
                
                return {winner,winnercells};
            }
            else if(counterxG==3 || counterXS==3){
                if(counterxG==3){
                    winnercells=[[0,0],[1,1],[2,2]];
                }
                else if(counterXS==3){
                    winnercells=[[0,2],[1,1],[2,0]];
                }
                winner='X';
                return {winner,winnercells};
            }
            else if(counter0G==3 || counter0S==3){
                if(counter0G==3){
                    winnercells=[[0,0],[1,1],[2,2]];
                }
                else if(counter0S==3){
                    winnercells=[[0,2],[1,1],[2,0]];
                }
                winner='0';
                return {winner,winnercells};
            }
        }
        return{winner,winnercells};
    }
    
   

    return{
        PlayGame,
        checkWinner,
        resetboard,
    };
})();


let reset=document.querySelector('.new-game');
reset.addEventListener('click',()=>{
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.disabled = false);
    cells.forEach(cell=>cell.textContent='');
    cells.forEach(cell => cell.classList.remove('hit'));
    GameBoard.resetboard();
})





