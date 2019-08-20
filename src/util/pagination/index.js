'use strict';

require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');

// javascript用函数来实现类
var Pagination = function() {
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    // 事件的处理，必须用事件代理，不能用事件绑定
    // 因为要在页面加载完成后再执行事件
    $(document).on('click', '.pg-item', function() {
        var $this = $(this);
        if ($this.hasClass('active') || $this.hasClass('disabled')) { // 点击带有active或disabled按钮，不作处理
            return;
        }
        typeof _this.option.onSelectPage === 'function' ?
            _this.option.onSelectPage($this.data('value')) : null;
    });
};

// 通过原型继承的方式来添加方法
Pagination.prototype.render = function(userOption) { // 渲染分页组件
    // 对一个空对象添加defaultOption和userOption
    // 这种写法不会对原本的defaultOption和userOption造成影响
    this.option = $.extend({}, this.defaultOption, userOption);
    if (!(this.option.container instanceof jQuery)) { // 判断容器是否为合法的jQuery对象
        return;
    }
    if (this.option.pages <= 1) { // 判断是否只有1页
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};

Pagination.prototype.getPaginationHtml = function() { // 获取分页的html
    // 样式如下：
    // |上一页| 2 3 4 =5= 6 7 8 |下一页| 5/9
    var html = '';
    var option = this.option;
    var pageArray = [];
    // 数字页码的起始
    var start = option.pageNum - option.pageRange > 0 ?
        option.pageNum - option.pageRange : 1;
    // 数字页码的结束
    var end = option.pageNum + option.pageRange < option.pages ?
        option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name: '上一页',
        value: option.prePage,
        disabled: !option.hasPreviousPage
    });
    // 数字按钮的处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: i === option.pageNum // active表示是否为当前页
        });
    }
    // 下一页按钮的数据
    pageArray.push({
        name: '下一页',
        value: option.nextPage,
        disabled: !option.hasNextPage
    });
    // 渲染html模板
    html = _mm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });
    return html;
};

// 导出模块
module.exports = Pagination;