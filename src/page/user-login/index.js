'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page逻辑部分
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() { // 绑定事件
        var _this = this;
        $('#submit').click(function () { // 点击登录按钮
            _this.submit();
        });
        $('.user-content').keyup(function (e) { // 如果按下回车，也进行提交
            if (e.keyCode === 13) { // 13是回车键的keyCode
                _this.submit();
            }
        });
    },
    submit: function() { // 提交表单
        // 从输入框获取用户名和密码
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        var validateResult = this.formValidate(formData); // 表单验证
        if (validateResult.status) { // 验证成功，提交
            _user.login(formData, function (res) { // 成功
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function (errMsg) { // 失败
                formError.show(errMsg);
            })
        } else { // 验证失败，做错误提示
            formError.show(validateResult.msg);
        }
    },
    formValidate: function (formData) { // 表单验证
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
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