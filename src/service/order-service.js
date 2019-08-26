'use strict';

var _mm = require('util/mm.js');

var _order = {
    getProductList: function(listParam, resolve, reject) { // 根据传入的参数获取商品列表
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
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
    }
};

module.exports = _order;