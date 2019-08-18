'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _user = require('service/user-service.js');

// page逻辑部分
var page = {
    init: function() {
        this.onLoad();
    },
    onLoad: function() { // 加载时，显示页面
        navSide.init({ // 初始化左侧菜单
            name: 'user-center'
        });
        this.loadUserInfo(); // 加载用户信息
    },
    loadUserInfo: function() { // 加载用户信息
        var userHtml = '';
        _user.getUserInfo(function(res) { // 成功
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) { // 加载失败
            _mm.errorTips(errMsg);
        });
    }
};
$(function() {
    page.init();
});