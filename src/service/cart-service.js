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
    addToCart: function (productInfo, resolve, reject) { // 添加到购物车
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    getCartList: function (resolve, reject) { // 获取购物车列表
        _mm.request({
            url: _mm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    selectProduct: function (productId, resolve, reject) { // 选中购物车商品
        _mm.request({
            url: _mm.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    unselectProduct: function (productId, resolve, reject) { // 取消选中购物车商品
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    selectAllProducts: function (resolve, reject) { // 购物车商品全选
        _mm.request({
            url: _mm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    unselectAllProducts: function (resolve, reject) { // 购物车商品取消全选
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    updateProduct: function(productInfo, resolve, reject) { // 更新购物车商品数量
        _mm.request({
            url: _mm.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    deleteProduct: function (productIds, resolve, reject) { // 删除购物车中商品，支持多选
        _mm.request({
            url: _mm.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _cart;