'use strict';

var _mm = require('util/mm.js');

var _order = {
    getOrderCartProductList: function(resolve, reject) { // 订单确认页的商品列表
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    createOrder: function (orderInfo, resolve, reject) { // 创建新订单
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    getOrderList: function (listParam, resolve, reject) { // 获取订单列表
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    }
};

module.exports = _order;