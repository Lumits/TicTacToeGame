var item = document.getElementsByClassName('game-item');
var restart = document.getElementById('restart-game');
var message = document.getElementById('message');
var player = 'X';
var stepCount = 0;
var winCombo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],    
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],    
];
var arrX = [];
var arr0 = [];

for (var i = 0; i < item.length; i++) {
    item[i].addEventListener('click', clickStep);
}

function clickStep () {
    var num = +this.getAttribute('data-cell');
    if(!this.textContent) {
        this.innerText = player;
        player === 'X' ? arrX.push(num) : arr0.push(num);

        if (
            (arrX.length > 2 || arr0.length > 2) && 
            (checkWin(arr0, num) || checkWin(arrX, num))
            ) {
                for (var i = 0; i < item.length; i++) {
                    item[i].removeEventListener('click', clickStep);
                }
                return (message.innerText = 'WIN' + ': '  + player)
            }

        changePlayer();
        stepCount++;
        (stepCount === 9) ? (message.innerText = 'Draw game'):
        (message.innerText = 'Play' + ': '  + player)
        }
}

function changePlayer () {
    player === 'X' ? (player = '0') : (player = 'X');
}

restart.addEventListener('click', function () {
for (var i = 0; i < item.length; i++) {
    item[i].innerText = '';
}
arr0 = [];
arrX = [];
player = 'X';
stepCount = 0;
message.innerText = 'Play' + ': '  + player;
for (var i = 0; i < item.length; i++) {
    item[i].addEventListener('click', clickStep);
}
});

function checkWin (arr, number) {
for (var w = 0; w < winCombo.length; w++) {
var winArr = winCombo[w];
var count = 0;
if (winArr.indexOf(number) !== -1) {
    for (var k = 0; k < winArr.length; k++) {
        if(arr.indexOf(winArr[k]) !== -1) {
                    count++;
                    if (count === 3) {
                        return true
                    }
                }

             }
             count = 0;
        }
    }
}