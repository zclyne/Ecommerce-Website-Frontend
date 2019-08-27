'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _order = require('service/order-service.js');
var Pagination = require('util/pagination/index.js');

// page逻辑部分
var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() { // 加载时，显示页面
        navSide.init({ // 初始化左侧菜单
            name: 'order-list'
        });
        this.loadOrderList(); // 加载订单列表
    },
    loadOrderList: function () { // 加载订单列表
        var orderListHtml = '';
        var _this = this;
        var $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function (res) { // 成功
            // 渲染html
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            // 加载分页信息
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        },function (errMsg) { // 失败
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
        });
    },
    loadPagination: function(pageInfo) { // 加载分页信息
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};
$(function() {
    page.init();
});