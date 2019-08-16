'use strict';

var _mm = require('util/mm.js');

var _cart = {
    getCartCount: function (resolve, reject) { // 获取购物车中商品数量
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    }
};

module.exports = _cart;