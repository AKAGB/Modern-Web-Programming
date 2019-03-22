window.onload = function () {
    var
        gameMain = document.getElementById('gameMain'),
        inGame = false,
        score = document.getElementById('Score'),
        startBtn = score.children[0],
        timeText = score.children[1].children[0],
        scoreText = score.children[3].children[0],
        holeNums = 60,
        gameTime = 30000,
        counter;

    for (var i = 0; i < holeNums; i++) {
        var hole = document.createElement('div');
        hole.setAttribute('class', 'hole');
        gameMain.appendChild(hole);
    }

    startBtn.addEventListener('click', function () {
        inGame = !inGame;
        if (inGame) {
            playing();
        }
        else {
            stopGame(true);
        }
    });

    /*click random hole*/
    gameMain.addEventListener('click', function (e) {
        if (inGame) {
            console.log(e.target.getAttribute('class'));
            var className = e.target.getAttribute('class');
            if (className === 'hole selected') {
                scoreText.value = parseInt(scoreText.value) + 1;
                // Cancell selected
                e.target.setAttribute('class', 'hole');
                // Selected new One
                randomHole();
            }
            else if (className === 'hole') {
                scoreText.value = parseInt(scoreText.value) - 1;
            }
        }
    });

    function playing() {
        inGame = true;
        score.children[2].value = 'Playing';
        scoreText.value = 0;
        //countTime((new Date()).valueOf() + gameTime);
        counter = setInterval(countTime, 10, (new Date()).valueOf() + gameTime);
        randomHole();
    }

    //param: true -> stop game by button; false -> Time is over
    function stopGame(btn) {
        inGame = false;
        score.children[2].value = 'Game Over';
        clearInterval(counter);
        if (!btn) {     // Time Over
            alert('Game Over\nYour score is: ' + scoreText.value);
        }
        clearGame();
    }

    /*Timer*/
    function countTime(endTime) {
        var now = new Date();
        var lastTime = parseInt((endTime - now) / 1000) % 60;
        timeText.setAttribute('value', lastTime + 1 + 's');
        if (endTime - now <= 0) {
            timeText.setAttribute('value', '0s');
            stopGame(false);
        }
    }

    function randomHole() {
        // Get random number from 0 to 59
        var index = Math.floor(Math.random() * 59);
        gameMain.children[index].setAttribute('class', 'hole selected');
    }

    function clearGame() {
        for (var i = 0; i < holeNums; i++) {
            gameMain.children[i].setAttribute('class', 'hole');
        }
    }
}
