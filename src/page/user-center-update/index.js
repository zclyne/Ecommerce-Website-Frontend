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
        this.bindEvent();
    },
    onLoad: function() { // 加载时，显示页面
        navSide.init({ // 初始化左侧菜单
            name: 'user-center'
        });
        this.loadUserInfo(); // 加载用户信息
    },
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.btn-submit', function() { // 点击提交按钮后的动作
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val()),
            },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) { // 验证成功
                _user.updateUserInfo(userInfo, function (res, msg) { // 更新用户信息成功
                    console.log(msg);
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function (errMsg) { // 更新用户信息失败
                    _mm.errorTips(errMsg);
                });
            } else { // 验证失败
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    loadUserInfo: function() { // 加载用户信息
        var userHtml = '';
        _user.getUserInfo(function(res) { // 成功
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) { // 加载失败
            _mm.errorTips(errMsg);
        });
    },
    validateForm: function(userInfo) { // 验证新的个人信息
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(userInfo.phone, 'phone')) { // 验证手机号
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_mm.validate(userInfo.email, 'email')) { // 验证邮箱
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_mm.validate(userInfo.question, 'require')) { // 验证密码提示问题
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(userInfo.answer, 'require')) { // 验证密码提示问题的答案
            result.msg = '密码提示问题的答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function() {
    page.init();
});