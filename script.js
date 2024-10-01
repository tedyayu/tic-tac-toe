const form=document.querySelector('#myform');
const message=document.querySelector('.message');
const restart=document.querySelector('.restart')
const winningconditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const formData=new FormData(form);
    const data=Object.fromEntries(formData);
    
    initializeGame(data);
});
const initializeVariables=(data)=>{
    data.board=[0,1,2,3,4,5,6,7,8];
    data.round=0;
    data.currentPlayer='x';
    data.gameOver=false;
}

const addEventListenerTogameboard=(data)=>{
    document.querySelectorAll('.cell').forEach((box)=>{
        box.addEventListener('click',(event)=>{
            playeMove(event.target,data)
            
        })
        
    })
}


const initializeGame=(data)=>{
    initializeVariables(data);
    
    addEventListenerTogameboard(data);
}

const playeMove=(box,data)=>{
    if(data.gameOver){
        return;
    }
    if(data.board[box.id]=='x' || data.board[box.id]=='o'){
        return;
    }
    

    data.board[box.id]=data.currentPlayer;
    box.textContent=data.currentPlayer;
    data.round++;
    console.log(box,data);

    if(endConditions(data)){
        
    }
};

const endConditions=(data)=>{

    if(checkWinner(data)){

        return true;
    }else if(data.round==9){
        message.textContent='it is a tie!';
        return true;
    }

    return false;
};

const checkWinner=(data)=>{
    let result=false;
    winningconditions.forEach((condition)=>{
        if(data.board[condition[0]]===data.board[condition[1]]&& data.board[condition[1]]===data.board[condition[2]]){
            
            
            data.gameOver=true;
            result=true;
            message.textContent=`${data.currentPlayer} has won!`;
            data.currentPlayer=data.currentPlayer=='x'? 'o':'x'
        }
        
    });
    data.currentPlayer=data.currentPlayer=='x'? 'o':'x';
    return result;
}

restart.addEventListener('click',(data,box)=>{
    data.board=[0,1,2,3,4,5,6,7,8];
    data.currentPlayer='x';
    data.gameOver=false;
    console.log(data.board);
    console.log(data.currentPlayer);
    document.querySelectorAll('.cell').forEach((box)=>{
        box.textContent='';
    });

    message.textContent='';
});
 