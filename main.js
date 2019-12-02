const TicTacToeApp = {
    main: document.querySelector('.main'),
    restartBtn: document.querySelector('#restartBtn'),
    freeFields: document.querySelectorAll('.area'),
    usedFields: [],
    movesDiv: document.querySelector('.moves'),
    signs: ['X','O'],
    playerOneFields: [],
    playerTwoFields: [],
    playerOneSign: null,
    playerTwoSign: null,
    moves: 0,
    turn: 1,
    available: true,
    winner: null,
    possibilities: [1,2,3,4,5,6,7,8,9],

    randomSigns: function() {
        let random = Math.floor(Math.random() * 2);
        random == 1 ? (this.playerOneSign = this.signs[1], this.playerTwoSign = this.signs[0]) : (this.playerOneSign = this.signs[0], this.playerTwoSign = this.signs[1]);
    },
    
    playerMove: function(event) {
        this.usedFields.includes(event.target) ? this.available = false : this.available = true;
        if(this.available) {
            this.usedFields.push(event.target);
            this.moves++;
            this.turn == 1 ? this.playerOneFields.push(parseInt(event.target.id)) : this.playerTwoFields.push(parseInt(event.target.id));
            this.movesDiv.innerText = `Ruch gracza nr: ${this.turn}`;
            if((this.moves%2 == 1 && this.playerOneSign == 'X') || (this.moves%2 == 0 && this.playerTwoSign == 'X')) {
                event.target.classList.add('fas','fa-times');
            } else if((this.moves%2 == 1 && this.playerOneSign == 'O') || (this.moves%2 == 0 && this.playerTwoSign == 'O')) {
                event.target.classList.add('far','fa-circle');
            }
            if(this.moves >= 5) this.checkWin();
            this.turn == 1 ? this.turn = 2 : this.turn = 1;
        }
    },

    checkWin: function() {
        if(this.contains(this.playerOneFields,this.possibilities.slice(0,3)) || this.contains(this.playerTwoFields,this.possibilities.slice(0,3)) || this.contains(this.playerOneFields,this.helpContains(0,3)) || this.contains(this.playerTwoFields, this.helpContains(0,3)) || this.contains(this.playerOneFields,this.helpContains(0,4)) || this.contains(this.playerTwoFields, this.helpContains(0,4))) {
            this.winner = `Gracz nr: ${this.turn} wygrywa. Gratulacje`;
        } else if(this.contains(this.playerOneFields,this.possibilities.slice(3,6)) || this.contains(this.playerTwoFields,this.possibilities.slice(3,6)) || this.contains(this.playerOneFields,this.helpContains(1,3)) || this.contains(this.playerTwoFields, this.helpContains(1,3)) || this.contains(this.playerOneFields,this.helpContains(2,2)) || this.contains(this.playerTwoFields, this.helpContains(2,2))) {
            this.winner = `Gracz nr: ${this.turn} wygrywa. Gratulacje`;
        } else if(this.contains(this.playerOneFields,this.possibilities.slice(6,9)) || this.contains(this.playerTwoFields,this.possibilities.slice(6,9)) || this.contains(this.playerOneFields,this.helpContains(2,3)) || this.contains(this.playerTwoFields, this.helpContains(2,3))) {
            this.winner = `Gracz nr: ${this.turn} wygrywa. Gratulacje`;
        } else if(this.moves == 9){
            this.winner = 'Remis';
        }
        if(this.winner != null) {
            this.main.innerText = '';
            this.main.classList.add('end__game');
            let winMessage = document.createElement('span');
            let restartBtn = document.createElement('button');
            restartBtn.addEventListener('click', () => window.location.reload())
            winMessage.className = 'win__message';
            winMessage.innerText = `${this.winner}`;
            restartBtn.className = 'restart__button';
            restartBtn.innerText = 'Restart';
            this.main.appendChild(winMessage);
            this.main.appendChild(restartBtn);
        }
    },

    contains: function(superset, subset) {
        return subset.every(value => {
            return (superset.indexOf(value) >= 0);
        })
    },

    helpContains: function(start,iterator) {
        let arr = [];
        for(let i=start; i<=this.possibilities.length; i+=iterator) {
            arr.push(this.possibilities[i]);
        }
        if((start == 0 && iterator == 3) || (start == 2 && iterator == 2)) arr.pop();
        return arr;
    },

    init: function() {
        this.randomSigns();
        document.querySelector('.signs').innerText = `Gracz 1: ${this.playerOneSign} Gracz 2: ${this.playerTwoSign}`;
        document.querySelector('.moves').innerText = 'Ruch gracza nr: 1';
        this.freeFields.forEach(element => element.addEventListener('click', this.playerMove.bind(this)))
    }
}

TicTacToeApp.init();