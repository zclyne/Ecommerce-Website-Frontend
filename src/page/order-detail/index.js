'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _order = require('service/order-service.js');

// page逻辑部分
var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() { // 加载时，显示页面
        navSide.init({ // 初始化左侧菜单
            name: 'order-detail'
        });
        this.loadDetail(); // 加载detail数据
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('确定要取消该订单吗？')) {
                _order.cancelOrder(_this.data.orderNumber, function (res) { // 成功
                    _mm.successTips('取消订单成功');
                    _this.loadDetail();
                }, function (errMsg) { // 失败
                    _mm.errorTips(errMsg);
                });
            }
        })
    },
    loadDetail: function () {
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function (res) { // 成功
            _this.dataFilter(res);
            // 渲染html
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function (errMsg) {
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    dataFilter: function (data) { // 数据的适配
        data.needPay = data.status === 10;
        data.isCancelable = data.status === 10;
    }
};
$(function() {
    page.init();
});