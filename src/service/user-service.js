'use strict';

var _mm = require('util/mm.js');

var _user = {
    logout: function (resolve, reject) { // 用户退出登录函数
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkLogin: function (resolve, reject) { // 检查登录状态
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};

module.exports = _user;