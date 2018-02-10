$(function () {
    // Initialize
    var isCheat = false,            // Cheat Flag
        inGame = false,
        cheat = $('#cheat'),
        maze = $('#maze'),
        walls = $('#maze>.walls'),
        start = $('#startPos'),
        end = $('#endPos'),
        ans = $('#ans');
    cheat.css('opacity', 0);
    ans.html('<br>').css('opacity', 0);

    start.mouseover(function () {
        cheat.css('opacity', 0);
        ans.css('opacity', 0);
        walls.css('backgroundColor', '#aaa');
        isCheat = false;
        inGame = true;          // Game Start
    });

    walls.mouseover(function () {
        if (inGame) {
            inGame = false;         // Game Over, lose
            $(this).css('backgroundColor', 'red');
            ans.html('You lose!').css('opacity', 1);
        }
    });

    end.mouseover(function () {
        if (inGame) {
            inGame = false;         // Game Over
            if (isCheat) {          // Check cheating
                cheat.css('opacity', 1);
            }
            else {
                ans.html('You win!').css('opacity', 1);
            }
        }
    });

    maze.mouseleave(function () {
        isCheat = true;
    });
});
