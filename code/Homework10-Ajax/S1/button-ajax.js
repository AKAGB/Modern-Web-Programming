$(function() {
    var 
        resultDiv = $('#info-bar'),
        buttons = $('.button'),
        num_blocks = $('.request-number'),      // 判断是否已经计算过结果
        calc_flag = true,                       // 记录计算结果
        calc_result = 0;
    
    $('#bottom-positioner').mouseout(check_init);
    Initial();    

    /*          *\
        函数定义
    \*          */

    function Initial() {
        calc_flag = true,                       // 记录计算结果
        calc_result = 0;
        buttons.off();
        resultDiv.off();
        buttons
            .click(function() {
                $(this).find('.request-number').text('...');
                get_num(this);
                check_num();
                $(this).off('click');
            });
        

        _.map(num_blocks, function(o) {
            o.textContent = '';
        });
        resultDiv.text('');
        check_num();
    }

    // 点击info块的事件，显示计算结果并灭活
    function click_info() {
        $('#info-bar').text(calc_result);
        $('#info-bar').off('click', click_info);
    }
    
    // 检查是每个按钮否有数字，没有数字则隐藏红圈
    function check_num() {
        _.map(num_blocks, function(o) {
            if (o.textContent == "") {
                $(o).css('opacity', '0');
            } else {
                $(o).css('opacity', '1');
            }
        });
        enable_info();
    }

    // 本地测试生成随机数
    function get_num(clk_btn) {
        var random_time = 1000 + getRandomNumber(2000);
        var random_num  = 1 + getRandomNumber(9);
        setTimeout(function() {
            $(clk_btn).find('.request-number').text(random_num);
            check_num();
        }, random_time);
    }

    function getRandomNumber(limit) {
        return Math.round(Math.random() * limit);
    }

    // 激活大气泡
    function enable_info() {
        var 
            info_events = $._data(resultDiv[0], 'events'),
            allNumbers = _.chain(num_blocks)
                            .filter(o => o.textContent.match(/^\d+$/))
                            .map(o => parseInt(o.textContent))
                            .value();
        if (allNumbers.length < 5) {
            resultDiv.off('click', click_info);
        }
        else if (calc_flag && (!info_events || !info_events['click'])) {
            calc_result = _.sum(allNumbers);
            resultDiv.click(click_info);
            calc_flag = false;
        }
    }

    // 检查是否处于初始状态
    function check_init() {
        // 等动画执行完毕再检查
        setTimeout(function() {
            console.log(resultDiv.css('left')+','+resultDiv.css('top'));
            if (resultDiv.css('left') == '0px' && resultDiv.css('top') == '0px') {
                console.log(2);
                Initial();
            }
        }, 1100);
    }
});
