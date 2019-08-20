'use strict';

require('./index.css');
var _mm = require('util/mm.js');

// 通用页面头部
var header = {
    init: function() {
        this.bindEvent();
        this.onLoad();
    },
    onLoad: function() { // 页面加载时，把搜索内容回填到搜索框中
        var keyword = _mm.getUrlParam('keyword');
        if (keyword) { // keyword存在，回填
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function() {
        var _this = this;
        $('#search-btn').click(function() { // 点击搜索按钮
            _this.searchSubmit();
        });
        $('#search-input').keyup(function(e) { // 输入回车后，搜索提交, 参数e为事件
            if (e.keyCode === 13) { // 13是回车键的keyCode
                _this.searchSubmit();
            }
        });
    },
    searchSubmit: function () { // 搜索提交
        var keyword = $.trim($('#search-input').val());
        if (keyword) { // 若提交时有keyword，正常跳转到list页
            window.location.href = './list.html?keyword=' + keyword;
        } else { // 若keyword为空，返回首页
            _mm.goHome();
        }
    }

};

header.init();