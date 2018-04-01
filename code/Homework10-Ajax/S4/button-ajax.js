$(function() {
    var 
        resultDiv = $('#info-bar'),
        buttons = $('.button'),
        num_blocks = $('.request-number'),      // 判断是否已经计算过结果
        a_plus_button = $('.icon'),              // @+按钮
        calc_flag = true,                       // 记录计算结果
        calc_result = 0,
        rest_buttons = Array.from({length: 5}, (x, y) => y),
        active_button,                          // 当前被点击的button
        ai;                                     // 机器人对象
        
    
    $('#bottom-positioner').mouseout(check_init);
    Initial();

    /* 定义AI对象 */
    function AI() {
        this.order =  [];
        this.now_click = 0;           // 当前点击button，注意是order的下标
        ai_flag = false;              // AI是否被触发
    }
    AI.prototype.check_complete = function () {
        if (this.now_click < this.order.length)
            return false;
        return true;
    };
    AI.prototype.ai_button_click = function () {    // 点击按钮
        buttons.eq(this.order[this.now_click++]).click();
    };
    AI.prototype.next = function () {               // 触发下一步操作
        if (this.check_complete()) 
            resultDiv.click();
        else 
            this.ai_button_click();
    };
    AI.prototype.actived = function (order) {
        this.ai_flag = true;
        this.order = this.random_list(order);
        return this.order;
    };
    AI.prototype.random_list = function (order) {
        var result = [];
        var cln = _.clone(order);
        var len = order.length;
        for (var i = len - 1; i >= 0; i--) {
            var j = Math.round(Math.random() * i);
            result[i] = cln[j];
            if (j != i)
                cln[j] = cln[i];
        }
        return result;
    }

    /*          *\
        函数定义
    \*          */

    function Initial() {
        calc_flag = true,                       // 记录计算结果
        calc_result = 0;
        rest_buttons = Array.from({length: 5}, (x, y) => y);
        ai = new AI();
        buttons.off();
        resultDiv.off();
        $('#display-order').css('opacity', '0');
        buttons.css('backgroundColor', '#44547b')
                .click(button_click);
        // 添加大气泡点击事件
        var e = $._data(a_plus_button, 'events');
        if (!e || !e['click'])
            a_plus_button.click(a_plus_click);
        _.map(num_blocks, function(o) {
            o.textContent = '';
        });
        resultDiv.text('');
        check_num();
    }

    // 点击大气泡事件
    function a_plus_click() {
        $(this).off('click');
        var order = ai.actived(rest_buttons);
        display_order(order);
        ai.next();
    }

    // 点击info块的事件，显示计算结果并灭活
    function click_info() {
        $('#info-bar').text(calc_result);
        $('#info-bar').off('click', click_info);
    }

    // button点击回调函数
    function button_click() {
        $(this).find('.request-number').text('...');
        active_button = $(this).index();
        // 灭活其他按钮
        _.forEach(_.clone(rest_buttons), function (each) {
            buttons.eq(each).off('click');
            if (each != active_button)
                buttons.eq(each).css('backgroundColor', '#7e7e7e');
        });
        rest_buttons.splice(rest_buttons.indexOf(active_button), 1);
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
        var ajax_result = $.ajax('/get_number')
            .always(function () {
                // 恢复按键并灭活活跃按钮
                _.forEach(rest_buttons, function (each) {
                    buttons.eq(each)
                            .css('backgroundColor', '#44547b')
                            .click(button_click);
                });
                buttons.eq(active_button)
                        .css('backgroundColor', '#7e7e7e');
            }).done(function (data) {
                $(clk_btn).find('.request-number').text(data);
                check_num();
                if (ai.ai_flag)        // 只有激活AI时才继续点击
                    ai.next();
            }).fail(function () {
                console.log('Fail!');
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

    // 显示点击顺序
    function display_order(order) { 
        var alphas = ['A', 'B', 'C', 'D', 'E']
        $('#display-order').text(`order: [${alphas[order[0]]},`
                                + ` ${alphas[order[1]]},`
                                + ` ${alphas[order[2]]},`
                                + ` ${alphas[order[3]]},`
                                + ` ${alphas[order[4]]}]`)
                            .css('opacity', '1');
    }
});
