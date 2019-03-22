$(function () {
    var todo_ths = $('#todo th'),
        staff_ths = $('#staff th'),
        todo_rows = $('#todo tbody tr'),
        staff_rows = $('#staff tbody tr'),
        ths = $('th');
    // 给每个th添加标记，true表示要升序，false表示要降序
    _.map(ths, function (value) {
        value.order = true;
    });

    function clickChange() {
        var arrTh = $(this).parent().children();
        var rows = $(this).parents('table').find('tbody tr');
        var tbody = $(this).parents('table').find('tbody')
        _.map(arrTh, function (value) {
            $(value).css('backgroundColor', 'rgb(0, 0, 138)');
            $(value.children[0]).css('opacity', '0');
        });
        $(this).css('backgroundColor', 'rgb(170, 172, 255)');

        var clickIndex = arrTh.index(this);     // 点击的列
        var sortedArr;                          // 存放排序好的行
        if (this.order) {
            // 升序
            $(this).find('img').attr('src', 'ascend.png');
            sortedArr = _.sortBy(rows, function (value) {
                return value.children[clickIndex].textContent;
            });
        } else {
            // 降序
            $(this).find('img').attr('src', 'descend.png');
            sortedArr = _.sortBy(rows, function (value) {
                return - value.children[clickIndex].textContent;
            });
        }

        rows.remove();
        _.map(sortedArr, function (value) {
            tbody.append(value);
        });

        console.log(sortedArr);
        this.order = !this.order;
        $(this.children[0]).css('opacity', '1');
    }

    todo_ths.click(clickChange);
    staff_ths.click(clickChange);
});
