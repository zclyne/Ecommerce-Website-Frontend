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
        $('#username').blur(function () { // 验证username是否已经存在
            var username = $.trim($(this).val());
            if (!username) { // 在用户名为空时，不做验证
                return;
            }
            // 异步验证用户名是否存在
            _user.checkUsername(username, function(res) { // 成功
                formError.hide();
            }, function(errMsg) { // 失败
                formError.show(errMsg);
            });
        });
        $('#submit').click(function () { // 点击注册按钮
            _this.submit();
        });
        $('.user-content').keyup(function (e) { // 如果按下回车，也进行提交
            if (e.keyCode === 13) { // 13是回车键的keyCode
                _this.submit();
            }
        });
    },
    submit: function() { // 提交表单
        // 从输入框获取用户信息
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        var validateResult = this.formValidate(formData); // 表单验证
        if (validateResult.status) { // 验证成功，提交
            _user.register(formData, function (res) { // 成功
                window.location.href = './result.html?type=register';
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
        if (!_mm.validate(formData.username, 'require')) { // 验证用户名是否为空
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) { // 验证密码是否为空
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.password.length < 6) { // 密码太短
            result.msg = '密码长度不能少于6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) { // 验证两次输入的密码是否一致
            result.msg = '两次输入的密码不一致';
            return result;
        }
        if (!_mm.validate(formData.phone, 'phone')) { // 验证手机号
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_mm.validate(formData.email, 'email')) { // 验证邮箱
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_mm.validate(formData.question, 'require')) { // 验证密码提示问题
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(formData.answer, 'require')) { // 验证密码提示问题的答案
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