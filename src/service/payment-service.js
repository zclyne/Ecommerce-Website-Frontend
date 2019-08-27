'use strict';

var _mm = require('util/mm.js');

var _payment = {
    getPaymentInfo: function(orderNumber, resolve, reject) { // 获取支付信息
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    getPaymentStatus: function(orderNumber, resolve, reject) { // 获取订单支付状态
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _payment;