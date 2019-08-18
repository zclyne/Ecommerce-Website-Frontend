'use strict';

var _mm = require('util/mm.js');

var _user = {
    login: function(userInfo, resolve, reject) { // 用户登录
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkUsername: function(username, resolve, reject) { // 检测用户名是否已存在
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    register: function(userInfo, resolve, reject) { // 用户注册
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    getQuestion: function(username, resolve, reject) { // 获取用户对应的密码提示问题
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkAnswer: function(userInfo, resolve, reject) { // 检查密码提示问题答案是否正确
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    resetPassword: function(userInfo, resolve, reject) { // 重置密码
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    updateUserInfo: function(userInfo, resolve, reject) { // 更新用户信息
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    getUserInfo: function(resolve, reject) { // 加载用户信息
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    updatePassword: function(userInfo, resolve, reject) { // 登录状态下修改密码
        _mm.request({
            url: _mm.getServerUrl('/user/reset_password.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    logout: function (resolve, reject) { // 用户退出登录
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