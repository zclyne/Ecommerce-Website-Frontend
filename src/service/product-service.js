'use strict';

var _mm = require('util/mm.js');

var _product = {
    getProductList: function(listParam, resolve, reject) { // 根据传入的参数获取商品列表
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    getProductDetail: function(productId, resolve, reject) { // 获取商品详细信息
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;