var columns = 2;
function Index(param) {
    this.dom = {
        btnStart: $('.start'),
        imgArea: $('.imgArea')
    };
    this.obj = {
        imgOrigArr: [],//图片拆分后，存储正确排序的数组
        imgWidth: parseInt(this.dom.imgArea.css('width')),
        imgHeight: parseInt(this.dom.imgArea.css('height')),
    };
    this.cell = {
        cellWidth: this.obj.imgWidth / columns,
        cellHeight: this.obj.imgHeight / columns,
    }
    this.img = param.img;
    this.sup = param.sup;
    this.hasStart = false;
    this.moveTime = 400;
    this.init();
}
Index.prototype.init = function () {
    this.imgSplit();
    this.gameState();
};

// 顺序分块
Index.prototype.imgSplit = function () {
    var self = this;
    self.obj.imgOrigArr = [];
    self.dom.imgArea.html('');
    var cell = '', cnt = 0;
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < columns; j++) {
            self.obj.imgOrigArr.push(i * columns + j);

            if (self.img[i * columns + j]) {
                cell = document.createElement('div');
                $(cell).attr('class', 'imgCell');
                $(cell).css({
                    'width': self.cell.cellWidth + 'px',
                    'height': self.cell.cellHeight + 'px',
                    'left': j * self.cell.cellWidth + 'px',
                    'top': i * self.cell.cellHeight + 'px',
                    'backgroundImage': 'url(' + self.img[i * columns + j] + ')'
                });
            }
            self.dom.imgArea.append(cell);
        }
    }
    self.dom.imgCell = $('.imgCell');
};

// 主函数，控制开始和结束
Index.prototype.gameState = function () {
    var self = this;
    self.dom.btnStart.bind('click', function () {
        if (!self.hasStart) {
            $(this).text('复原');
            self.hasStart = true;

            // 添加鼠标相关事件
            self.dom.imgCell.css({
                'cursor': 'pointer'
            }).bind('mouseover', function () {
                $(this).addClass('hover');
            }).bind('mouseout', function () {
                $(this).removeClass('hover');
            }).bind('mousedown', function (e) {
                $(this).css('cursor', 'move');
                var cellIndex1 = $(this).index();
                var cellX = e.pageX - self.dom.imgCell.eq(cellIndex1).offset().left;
                var cellY = e.pageY - self.dom.imgCell.eq(cellIndex1).offset().top;
                // 鼠标按下imgCell的时候绑定鼠标移动事件，根据offset调整位置
                $(document).bind('mousemove', function (e2) {
                    self.dom.imgCell.eq(cellIndex1).css({
                        'z-index': '100',
                        'left': (e2.pageX - cellX - self.dom.imgArea.offset().left) + 'px',
                        'top': (e2.pageY - cellY - self.dom.imgArea.offset().top) + 'px',
                    });
                }).bind('mouseup', function (e3) {
                    var cellIndex2 = self.changeIndex((e3.pageX - self.dom.imgArea.offset().left), (e3.pageY - self.dom.imgArea.offset().top), cellIndex1);
                    if (cellIndex1 == cellIndex2) {
                        self.cellReturn(cellIndex1);
                    } else {
                        self.cellChange(cellIndex1, cellIndex2);
                    }
                    $(document).unbind('mousemove').unbind('mouseup');
                });
            }).bind('mouseup', function () {
                $(this).css('cursor', 'pointer')
            });
        } else {
            $(this).text('开始');
            self.hasStart = false;
            self.cellOrder(self.obj.imgOrigArr);
            self.dom.imgCell.css('cursor','default').unbind('mouseover').unbind('mousedown').unbind('mouseup');
        }
    })
}

// x,y是在imgArea中的坐标，orig是鼠标点击图片的下标
// 返回x,y位置对应的拼图在乱序列表中的下标
Index.prototype.changeIndex = function (x, y, orig) {
    var self = this;
    if (x < 0 || x > self.obj.imgWidth || y < 0 || y > self.obj.imgHeight) {
        return orig;
    }
    if (_.findIndex(self.sup, {'top': from, }))
    var row = Math.floor(y / self.cell.cellHeight),
        col = Math.floor(x / self.cell.cellWidth),
        location = row * columns + col;
    var i = 0, len = self.obj.imgOrigArr.length;
    while ((i < len) && (self.obj.imgOrigArr[i] !== location)) {
        i++;
    }
    return i;
}

// 覆盖
Index.prototype.cellChange = function (from, to) {
    var self = this;
    var rowFrom = Math.floor(this.obj.imgOrigArr[from] / columns),
        colFrom = this.obj.imgOrigArr[from] % columns,
        rowTo = Math.floor(this.obj.imgOrigArr[to] / columns),
        colTo = this.obj.imgOrigArr[to] % columns,
        temp = this.obj.imgOrigArr[from];
    this.dom.imgCell.eq(from).animate({
        'top': rowTo * this.cell.cellHeight + 'px',
        'left': colTo * this.cell.cellWidth + 'px',
    }, this.moveTime, function () {
        $(this).css({
            'z-index': '40'
        });
    });
}

// index拼图返回原来的位置
Index.prototype.cellReturn = function (index) {
    var row = Math.floor(this.obj.imgOrigArr[index] / columns),
        col = this.obj.imgOrigArr[index] % columns;
    this.dom.imgCell.eq(index).animate({
        'top': row * this.cell.cellHeight + 'px',
        'left': col * this.cell.cellWidth + 'px',
    }, this.moveTime);
}

new Index({
        'img': [
                'images/pic-01.jpg',
                'images/pic-02.jpg'
            ],
        'sup': [
                {
                    'top': 'url(images/pic-01.jpg)',
                    'bottom': 'url(images/pic-02.jpg)',
                    'rst': 'url(images/pic-03.jpg)'
                }
            ]
    });
