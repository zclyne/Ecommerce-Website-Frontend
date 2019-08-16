'use strict';

var Hogan = require('hogan.js');

var conf = {
   serverHost: ''
};

var _mm = {
    request: function(param) { // 网络请求
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data : param.data || '',
            success: function(res) {
                if (0 === res.status) { // 请求成功
                    // 若param的success是函数，则作为回调
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (10 === res.status) { // 需要登录
                    _this.doLogin();
                } else if (1 === res.status) { // 请求数据错误
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error : function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    getServerUrl: function(path) { // 获取服务器地址
        return conf.serverHost + path;
    },
    getUrlParam: function(name) { // 获取url参数
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 匹配key=value的形式
        // window.location.search是url中包含?的参数，例如"?keyword=iphone&stock=1"
        // .substr(1)把开头的?去掉，然后匹配正则reg
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    renderHtml: function(htmlTemplate, data) { // 渲染html，把传入的模板和数据做拼接
        // Hogan分为编译和渲染两部分
        var template = Hogan.compile(htmlTemplate); // 编译
        var result = template.render(data); // 渲染
        return result;
    },
    successTips: function(msg) { // 成功提示
        alert(msg || '操作成功！');
    },
    errorTips: function(msg) { // 错误提示
        alert(msg || '操作失败，臭dd');
    },
    validate: function(value, type) { // 字段的验证，支持非空判断、手机、邮箱的判断
        var value = $.trim(value);
        if ('require' === type) { // 非空验证
            return !!value;
        }
        if ('phone' === type) { // 手机号验证
            return /^1\d{10}$/.test(value); // 以1开头，接10位数字
        }
        if ('email' === type) { // 邮箱格式验证
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    doLogin: function () { // 统一登录处理，跳转到登录页面，登录后再跳转回来
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome: function() { // 跳回主页
        window.location.href = './index.html';
    }
};

module.exports = _mm;