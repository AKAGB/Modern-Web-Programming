$(function () {
    var parts = $('.part'),
        puzzle = $('#puzzle'),
        arrPos = [],
        startBtn = $('#start');

    for (var i = 0; i < parts.length; i++) {
        var pos = {
            x: $(parts[i]).css('left'),
            y: $(parts[i]).css('top')
        };
        arrPos.push(pos);
    }

    randomPuz();

    function checkWin() {
        for(var i = 0; i < parts.length; i++) {
            if ($('#part' + (i + 1)).css('left') !== arrPos[i].x
                || $('#part' + (i + 1)).css('top') !== arrPos[i].y) {
                // console.log(i);
                // console.log($('#part' + (i + 1)).css('left'));
                // console.log(arrPos[i].x);
                return;
            }
        }
        showWin();
    }

    function showWin() {
        parts.css('border-width', '0');
        parts.off('click');
        alert('You Win!');
    }

    function randomPuz() {
        // 随机排列
        var newPuz = parts.sort(function () {
            return 0.5 - Math.random();
        });
        parts.remove();
        // 添加
        puzzle.append(newPuz);
        parts = $('.part');

        // 检查游戏是否能完成
        var result = 0;
        for (var i = 1; i < parts.length; i++) {
            var ni = parseInt(parts[i].id.slice(4));
            for (var j = 0; j < i; j++) {
                if (parseInt(parts[j].id.slice(4)) > ni) {
                    result++;
                }
            }
        }
        // blank的位置
        var idx = parts.index($('#part16'));
        result += Math.floor(idx / 4) + idx % 4;

        // 对不可通关的情况处理，即调换非空白块
        if (result % 2 != 0) {
            if (idx == 0 || idx == parts.length - 1) {
                parts[2].after(parts[1]);
            }
            else {
                var p1 = parts[0],
                    p2 = parts[parts.length-1];
                puzzle.append(p1);
                puzzle.prepend(p2);
            }
        }
    }

    function partClk() {
        var target = $(this),
            blank = $('#part16');
        if (this.id !== 'part16') {
            var blankT = parseInt(blank.css('top')),
                blankL = parseInt(blank.css('left')),
                tgT = parseInt(target.css('top')),
                tgL = parseInt(target.css('left'));

            // 判断点击对象是否在空白格附近
            // 水平移动
            if (blankT === tgT && Math.abs(blankL-tgL) <= 106) {
                target.animate({left: blankL + 'px'}, 300, 'linear');
                blank.css('left', tgL) + 'px';
            }
            // 垂直移动
            else if (blankL === tgL && Math.abs(blankT-tgT) <= 106) {
                target.animate({top: blankT + 'px'}, 300, 'linear');
                blank.css('top', tgT + 'px');
            }
            setTimeout(checkWin, 500);
        }
    }

    startBtn.click(function() {
        parts.remove();
        // 添加16块拼图
        for (var i = 0; i < 16; i++) {
            var tmp = $('<div class="part" id="part' +(i+1)+ '"></div>');
            puzzle.append(tmp);
        }
        parts = $('.part');
        randomPuz();
        parts.click(partClk);
    });

    parts.click(partClk);
});
