'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _payment = require('service/payment-service.js');

// page逻辑部分
var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() { // 加载时，显示页面\
        this.loadPaymentInfo(); // 加载支付信息
    },
    loadPaymentInfo: function () { // 加载支付信息
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function (res) { // 成功
            // 渲染html
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus(); // 开始监听订单状态
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    listenOrderStatus: function () { // 监听订单状态
        var _this = this;
        // 轮询，每5秒检查一次
        this.paymentTimer = window.setInterval(function() {
            _payment.getPaymentStatus(_this.data.orderNumber, function(res) {
                if (res === true) { // 订单支付成功
                    // 把orderNumber放在参数中传过去，方便在结果页跳转到订单详情
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            });
        }, 5e3);
    }
};
$(function() {
    page.init();
});