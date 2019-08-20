'use strict';

var _mm = require('util/mm.js');

var _cart = {
    getCartCount: function (resolve, reject) { // 获取购物车中商品数量
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },
    addToCart: function(productInfo, resolve, reject) { // 添加到购物车
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    }
};

module.exports = _cart;