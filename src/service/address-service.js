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
};

module.exports = _address;