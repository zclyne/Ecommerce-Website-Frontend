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
    data: { // 用于暂存数据
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() { // 页面刚加载时，显示找回密码第一步——输入用户名
        this.loadStepUsername();
    },
    loadStepUsername: function() { // 加载第一步——输入用户名
        $('.step-username').show();
    },
    loadStepQuestion: function() { // 加载第二步——输入密码提示问题答案
        formError.hide(); // 清除错误提示
        $('.step-username').hide() // 容器切换
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    loadStepPassword: function() { // 加载第三步——输入新密码
        formError.hide(); // 清除错误提示
        $('.step-question').hide() // 容器切换
            .siblings('.step-password').show();
    },
    bindEvent: function() { // 绑定事件
        var _this = this;
        $('#submit-username').click(function() { // 输入用户名后点击下一步
            var username = $.trim($('#username').val());
            if (username) { // 用户名不为空，请求该用户名对应的密码提示问题
                _user.getQuestion(username, function (res) { // 成功
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg) { // 失败
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入用户名');
            }
        });
        $('#submit-question').click(function() { // 输入密码提示问题答案后点击下一步
            var answer = $.trim($('#answer').val());
            if (answer) { // 密码提示问题答案不为空，判断是否正确
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res) { // 验证成功
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入密码提示问题的答案');
            }
        });
        $('#submit-password').click(function() { // 输入新密码后点击下一步
            var password = $.trim($('#password').val());
            if (password && password.length >= 6) { // 新密码不为空，设置新密码
                _user.resetPassword({
                    username: _this.data.username,
                    // TODO: 在与自己的后端对接时，记得修改此处的passwordNew
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function(res) { // 验证成功
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入不少于6位的新密码');
            }
        });
    }
};
$(function() {
    page.init();
});