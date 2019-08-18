'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// page逻辑部分
var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() { // 加载时，显示页面
        navSide.init({ // 初始化左侧菜单
            name: 'user-pass-update'
        });
    },
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.btn-submit', function() { // 点击提交按钮后的动作
            // TODO: 在和自己的后端对接时，修改变量名
            var userInfo = {
                    password: $.trim($('#password').val()),
                    passwordNew: $.trim($('#password-new').val()),
                    passwordConfirm: $.trim($('#password-confirm').val()),
                },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) { // 验证成功
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (res, msg) { // 更改密码成功
                    console.log(msg);
                    _mm.successTips(msg);
                    window.location.href = "./user-center.html";
                }, function (errMsg) { // 更改密码失败
                    _mm.errorTips(errMsg);
                });
            } else { // 验证失败
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    validateForm: function(userInfo) { // 验证新的个人信息
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(userInfo.password, 'require')) { // 验证原密码是否为空
            result.msg = '原密码不能为空';
            return result;
        }
        if (!userInfo.passwordNew || userInfo.passwordNew.length < 6) { // 验证新密码长度
            result.msg = '密码长度不得少于6位';
            return result;
        }
        if (userInfo.passwordNew !== userInfo.passwordConfirm) { // 验证两次密码是否一致
            result.msg = '两次密码不一致';
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