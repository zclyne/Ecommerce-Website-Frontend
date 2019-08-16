'use strict';

require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

// 导航
var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function() {
        // 登录点击事件
        $('.js-login').click(function () {
            _mm.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function () {
            window.location.href = './register.html';
        });
        // 退出登录点击事件
        $('.js-logout').click(function () {
            _user.logout(function(res) {
                window.location.reload();
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
        });
    },
    loadUserInfo: function() { // 加载用户信息
        _user.checkLogin(function(res) {
            // 用户已登录时，将not-login的html元素置为不可见，并显示login的html元素
            // 然后将username部分置为用户的username，从res中获取
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg) {
            // do nothing
        });
    },
    loadCartCount: function() { // 加载购物车中商品数量
        _cart.getCartCount(function() {
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg) {
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();