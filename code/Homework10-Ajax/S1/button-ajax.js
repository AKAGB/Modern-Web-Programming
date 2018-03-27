$(function() {
    var 
        resultDiv = $('#info-bar'),
        buttons = $('.button'),
        num_blocks = $('.request-number'),
        // 判断是否已经计算过结果
        calc_flag = true, 
        // 记录计算结果
        calc_result = 0;
    
    buttons.click(function() {
        var 
            info_events = $._data(resultDiv[0], 'events'),
            allNumbers = _.chain(num_blocks)
                            .filter(o => o.textContent != "")
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
    });
    
    // 点击info块的事件，显示计算结果并灭活
    function click_info() {
        $('#info-bar').text(calc_result);
        $('#info-bar').off('click', click_info);
    }
    
});
