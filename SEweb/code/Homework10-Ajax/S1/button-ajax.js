$(function() {
    var 
        resultDiv = $('#info-bar'),
        buttons = $('.button'),
        num_blocks = $('.request-number'),      // 判断是否已经计算过结果
        calc_flag = true,                       // 记录计算结果
        calc_result = 0,
        rest_buttons = Array.from({length: 5}, (x, y) => y),
        active_button;                          // 当前被点击的button
    
    $('#bottom-positioner').mouseout(check_init);
    Initial();    

    /*          *\
        函数定义
    \*          */

    function Initial() {
        calc_flag = true,                       // 记录计算结果
        calc_result = 0;
        rest_buttons = Array.from({length: 5}, (x, y) => y);
        buttons.off();
        resultDiv.off();
        buttons.css('backgroundColor', '#44547b')
                .click(button_click);
        
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

    // button点击回调函数
    function button_click() {
        $(this).find('.request-number').text('...');
        active_button = rest_buttons.indexOf($(this).index());
        // 灭活其他按钮
        _.forEach(rest_buttons, function (each) {
            buttons.eq(each).off('click');
            if (each != active_button)
                buttons.eq(each).css('backgroundColor', '#7e7e7e');
        });
        rest_buttons.splice(active_button, 1);
        get_num(this);
        check_num();
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
    /*
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
    */

    // ajax请求随机数
    function get_num(clk_btn) {
        let ajax_result = $.ajax('/get_number')
            .done(function (data) {
                $(clk_btn).find('.request-number').text(data);
                check_num();
            }).fail(function () {
                console.log('Fail!');
            }).always(function () {
                // 恢复按键并灭活活跃按钮
                _.forEach(rest_buttons, function (each) {
                    buttons.eq(each)
                            .css('backgroundColor', '#44547b')
                            .click(button_click);
                });
                buttons.eq(active_button)
                        .css('backgroundColor', '#7e7e7e');
            });
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
            if (resultDiv.css('left') == '0px' && resultDiv.css('top') == '0px') 
                Initial();
        }, 1100);
    }
});
