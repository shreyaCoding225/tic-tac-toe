let cells= document.querySelectorAll('.cell');
let resetButton= document.querySelector('.reset');
let newGameBtn= document.querySelector('.new-btn');
let msgContainer= document.querySelector('.msg-container');
let msg= document.querySelector('#msg');


let turnO= true;
let count= 0;

const winPatterns= [[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                    [0, 4, 8], [2, 4, 6] // diagonals
                ];  
                
cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        // if(cell.innerText === '') {
        //     if(turnO){
        //         cell.innerText= 'O';
        //         turnO= false;
        //     }else{
        //         cell.innerText= 'X';
        //         turnO= true;
        //     }
        // }

        //or
        if(turnO){
            cell.classList.add('O');
            cell.classList.remove('X');
            cell.innerText= 'O';
            turnO= false;
        }else{
            cell.classList.add('X');
            cell.classList.remove('O');
            cell.innerText= 'X';
            turnO= true;
        }
        cell.disabled= true;
        count++;

        checkWinner();
    });
});


const showWinner= (winner) => {
    msgContainer.classList.remove('hide');
    msg.innerText= `${winner} wins!`;
    for(let cell of cells){
        cell.disabled= true; 
    }
}

const checkDraw = () => {
    if(count === 9 && msgContainer.classList.contains('hide')){ 
            msgContainer.classList.remove('hide');
            msg.innerText= 'It\'s a draw!';
        }
};

const checkWinner= () => {
    for(let pattern of winPatterns){
        let cell1= cells[pattern[0]].innerText;
        let cell2= cells[pattern[1]].innerText; 
        let cell3= cells[pattern[2]].innerText;

        if(cell1 !== ''){
            if(cell1 === cell2 && cell2 === cell3){
                showWinner(cell1);
                return;
            }
        }
    }
    checkDraw();
};

const resetGame= () => {
    turnO= true;
    for(let cell of cells){
        cell.innerText= '';
        cell.disabled= false;
    }
    msgContainer.classList.add('hide');
}

newGameBtn.addEventListener('click', resetGame);
resetButton.addEventListener('click', resetGame);