'use strict';

var _mm = require('util/mm.js');

var _address = {
    getAddressList: function(resolve, reject) { // 获取地址列表
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50 // 最多取50个地址
            },
            success: resolve,
            error: reject
        });
    },
    save: function (addressInfo, resolve, reject) { // 添加新收件地址
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    update: function (addressInfo, resolve, reject) { // 更新已有的地址
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    deleteAddress: function (shippingId, resolve, reject) { // 删除地址
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    getAddress: function (shippingId, resolve, reject) { // 获取单条地址
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
};

module.exports = _address;